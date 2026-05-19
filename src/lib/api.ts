const API_BASE = import.meta.env.VITE_API_URL || 'https://numansubhani.pythonanywhere.com/api';

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  deliveryType: 'Bike' | 'Drone' | 'Both';
  categories: string[];
  image: string;
  description: string;
  menu: FoodItem[];
  status?: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  name: string;
  role: 'customer' | 'restaurant_owner' | 'admin';
  phone?: string;
  tier?: string;
  wallet_balance?: string;
  restaurant?: Restaurant;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: AuthUser;
  restaurant?: Restaurant;
}

function getTokens() {
  return {
    access: localStorage.getItem('access_token'),
    refresh: localStorage.getItem('refresh_token'),
  };
}

export function setTokens(access: string, refresh: string) {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
}

export function clearTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
}

export function saveUser(user: AuthUser) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function formatApiError(err: unknown): string {
  if (!err || typeof err !== 'object') return '';
  const data = err as Record<string, unknown>;
  if (typeof data.detail === 'string') return data.detail;
  if (Array.isArray(data.detail)) return data.detail.map(String).join(', ');

  const messages: string[] = [];
  const walk = (value: unknown) => {
    if (typeof value === 'string') messages.push(value);
    else if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === 'object') Object.values(value).forEach(walk);
  };
  walk(data);
  return messages.join(' ');
}

async function refreshAccessToken(): Promise<string | null> {
  const { refresh } = getTokens();
  if (!refresh) return null;
  try {
    const res = await fetch(`${API_BASE}/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    localStorage.setItem('access_token', data.access);
    return data.access;
  } catch {
    return null;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  auth = true,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (auth) {
    const { access } = getTokens();
    if (access) headers['Authorization'] = `Bearer ${access}`;
  }

  let res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401 && auth) {
    const newAccess = await refreshAccessToken();
    if (newAccess) {
      headers['Authorization'] = `Bearer ${newAccess}`;
      res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    }
  }

  if (!res.ok) {
    let message = 'Request failed';
    try {
      const err = await res.json();
      message = formatApiError(err) || message;
    } catch {
      if (res.status === 401) message = 'Please sign in to continue.';
      else if (res.status >= 500) message = 'Server error. Please try again.';
    }
    throw new Error(message);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

function mapRestaurant(r: Record<string, unknown>): Restaurant {
  return {
    id: String(r.id),
    name: String(r.name),
    rating: Number(r.rating),
    deliveryTime: String(r.delivery_time ?? r.deliveryTime ?? '20-30 min'),
    deliveryType: (r.delivery_type ?? r.deliveryType ?? 'Both') as Restaurant['deliveryType'],
    categories: (r.categories as string[]) || [],
    image: String(r.image || ''),
    description: String(r.description || ''),
    menu: ((r.menu as Record<string, unknown>[]) || []).map((m) => ({
      id: String(m.id),
      name: String(m.name),
      description: String(m.description || ''),
      price: Number(m.price),
      image: String(m.image || ''),
      category: String(m.category || 'Main Course'),
    })),
  };
}

// Auth
export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    apiFetch<AuthResponse>('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    }, false),

  registerRestaurant: (data: Record<string, unknown>) =>
    apiFetch<AuthResponse>('/auth/register/restaurant/', {
      method: 'POST',
      body: JSON.stringify({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        brand_name: data.brandName,
        address: data.address,
        province: data.province,
        city: data.city,
        country: data.country || 'Oman',
      }),
    }, false),

  login: (email: string, password: string) =>
    apiFetch<AuthResponse>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }, false),

  me: () => apiFetch<AuthUser>('/auth/me/'),
};

// Restaurants
export const restaurantsApi = {
  list: async (params?: { category?: string; search?: string }) => {
    const qs = new URLSearchParams();
    if (params?.category) qs.set('category', params.category);
    if (params?.search) qs.set('search', params.search);
    const query = qs.toString() ? `?${qs}` : '';
    const data = await apiFetch<Record<string, unknown>[]>(`/restaurants/${query}`, {}, false);
    return data.map(mapRestaurant);
  },

  get: async (slug: string) => {
    const data = await apiFetch<Record<string, unknown>>(`/restaurants/${slug}/`, {}, false);
    return mapRestaurant(data);
  },
};

// Orders
export const ordersApi = {
  create: (data: {
    restaurant_id: string;
    items: { food_item_id: number; quantity: number }[];
    delivery_type: 'Bike' | 'Drone';
    recipient_name: string;
    recipient_email?: string;
    address_line: string;
    address_city: string;
    address_node?: string;
    payment_method?: string;
  }) =>
    apiFetch('/orders/', { method: 'POST', body: JSON.stringify(data) }),

  list: (active?: boolean) => {
    const q = active ? '?active=true' : '';
    return apiFetch(`/orders/${q}`);
  },

  tracking: (orderNumber: string) =>
    apiFetch(`/orders/${orderNumber}/tracking/`),
};

// User profile
export const userApi = {
  profile: () => apiFetch<{
    user: AuthUser;
    stats: { completed_orders: number; rating: number };
    active_orders: unknown[];
    order_history: unknown[];
    wallet_balance: string;
    addresses: { id: number; label: string; line: string; city: string; node: string }[];
  }>('/users/me/profile/'),
};

// Restaurant owner
export const restaurantOwnerApi = {
  dashboard: () => apiFetch<{
    restaurant: Restaurant;
    stats: Record<string, string>;
    active_orders: { id: string; customer: string; items: string; type: string; status: string }[];
    top_sellers: { name: string; count: number; trend: string }[];
    cover_image: string;
  }>('/restaurant/dashboard/'),

  addMenuItem: (data: {
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }) =>
    apiFetch('/restaurant/menu-items/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateProfile: (data: { cover_image?: string; image?: string }) =>
    apiFetch('/restaurant/profile/', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
};

// Admin
export const adminApi = {
  stats: () => apiFetch<{ users_count: number; restaurants_count: number; orders_count: number }>('/admin/stats/'),
  users: () => apiFetch<{ id: number; name: string; email: string; orders: number; status: string; joined: string }[]>('/admin/users/'),
  restaurants: () => apiFetch<{ id: string; name: string; owner: string; status: string; revenue: string; rating: number }[]>('/admin/restaurants/'),
  banUser: (userId: number) =>
    apiFetch(`/admin/users/${userId}/ban/`, { method: 'POST', body: JSON.stringify({ action: 'ban' }) }),
  unbanUser: (userId: number) =>
    apiFetch(`/admin/users/${userId}/ban/?action=unban`, {
      method: 'POST',
      body: JSON.stringify({ action: 'unban' }),
    }),
  lockdownRestaurant: (slug: string) => apiFetch(`/admin/restaurants/${slug}/lockdown/`, { method: 'POST' }),
};
