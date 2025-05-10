// pages/api/directors-with-movies.js

import { supabase } from "../lib/supabaseClient";


export default async function handler(req, res) {
  const [{ data: directors }, { data: movies }] = await Promise.all([
    supabase.from('directors').select('*'),
    supabase.from('movies').select('*'),
  ]);
  res.status(200).json({ directors, movies });
}