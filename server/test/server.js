import express from 'express';
import { supabase } from '../src/db/supabaseClient.js';

const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
  const { data, error } = await supabase.from('DEMO').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/users', async (req, res) => {
  const { name, money } = req.body;
  const { data, error } = await supabase.from('DEMO').insert([{ name, money }]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
