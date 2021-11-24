import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://sfoctoaohlnuknsihyah.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNzY4Njk3MiwiZXhwIjoxOTUzMjYyOTcyfQ.bqYLEvFlmdZLLRaAXJd5ObX2mVtMqeXtXTirn_vQjXg"
);

export default supabase;
