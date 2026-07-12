const { supabase, supabaseAdmin } = require('../config/supabase');
const { v4: uuidv4 } = require('uuid');

const getAssets = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('assets')
      .select('*, profiles(*)')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Get assets error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAssetById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('assets')
      .select('*, profiles(*), maintenance_records(*)')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Get asset by id error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createAsset = async (req, res) => {
  try {
    const { name, code, category, location, purchaseDate, status, nextServiceDate } = req.body;
    
    const { data: existingAsset } = await supabase
      .from('assets')
      .select('id')
      .eq('code', code)
      .single();

    if (existingAsset) {
      return res.status(400).json({ error: 'Asset code already exists' });
    }

    const { data, error } = await supabase
      .from('assets')
      .insert({
        name,
        code,
        category,
        location,
        purchase_date: purchaseDate,
        status: status || 'operational',
        next_service_date: nextServiceDate,
        user_id: req.user.id
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('Create asset error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, category, location, purchaseDate, status, nextServiceDate } = req.body;

    const { data, error } = await supabase
      .from('assets')
      .update({
        name,
        code,
        category,
        location,
        purchase_date: purchaseDate,
        status,
        next_service_date: nextServiceDate
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Update asset error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('assets')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Asset deleted successfully' });
  } catch (error) {
    console.error('Delete asset error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAssets, getAssetById, createAsset, updateAsset, deleteAsset };
