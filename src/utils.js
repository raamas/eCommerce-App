import { supabase } from "./supabaseClient.js";

export const getProducts = async () => {
  console.log(`getProducts with params null`);

  let { data, error } = await supabase
    .from("products")
    .select()
    .order("ratings", { ascending: false });

  if (!data) {
    console.log(error);
  }

  console.log(data);
  return data;
};

export const getProduct = async (productId) => {
  console.log(`getProduct with params ${productId}`);

  let { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", productId)
    .single();

  if (!data) {
    console.log(error);
  }

  console.log(data);
  return data;
};

export const getOrders = async () => {
  console.log(`getOrders with params null`);

  let { data, error } = await supabase
    .from("orders")
    .select()
    .eq("isFulfilled", false)
    .limit(25);

  if (!data) {
    console.log(error);
  }

  console.log(data);
  return data;
};

export const getOrderProducts = async (productIds) => {
  console.log(`getOrderProducts with params ${productIds}`);

  let { data, error } = await supabase
    .from("products")
    .select()
    .in("id", [...productIds]);

  if (!data) {
    console.log(error);
  }

  console.log(data);
  return data;
};
