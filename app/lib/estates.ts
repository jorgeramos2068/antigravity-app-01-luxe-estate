import { supabase } from './supabase';
import type { Property } from './mockData';

export const PAGE_SIZE = 8;

/** Map a raw DB row to the existing Property interface */
function rowToProperty(row: Record<string, unknown>): Property {
  return {
    id: row.id as string,
    title: row.title as string,
    location: row.location as string,
    price: Number(row.price),
    pricePerMonth: (row.price_per_month as boolean) || false,
    beds: Number(row.beds),
    baths: Number(row.baths),
    area: Number(row.area),
    image: row.image as string,
    tags: row.tags as string[],
    featured: (row.featured as boolean) || false,
  };
}

/** Featured (hero) estates — always 2 rows */
export async function getFeaturedEstates(): Promise<Property[]> {
  const { data, error } = await supabase
    .from('estates')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: true })
    .limit(2);

  if (error) throw new Error(error.message);
  return (data ?? []).map(rowToProperty);
}

/** Paginated non-featured estates for the "New in Market" section */
export async function getEstates(
  page: number,
  pageSize: number = PAGE_SIZE
): Promise<{ data: Property[]; totalCount: number }> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('estates')
    .select('*', { count: 'exact' })
    .eq('featured', false)
    .order('created_at', { ascending: true })
    .range(from, to);

  if (error) throw new Error(error.message);
  return { data: (data ?? []).map(rowToProperty), totalCount: count ?? 0 };
}
