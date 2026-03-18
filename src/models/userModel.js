const db = require('../firebase');
const col = db.collection('users');

const getAll = async () => {
  const snapshot = await col.orderBy('createdAt', 'desc').get();
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() })).filter(u => !u.archived);
};

const getById = async (id) => {
  const doc = await col.doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

const create = async ({ name, email, age, genre }) => {
  const data = { name, email, age: age ?? null, genre: genre ?? null, archived: false, createdAt: new Date().toISOString() };
  const ref = await col.add(data);
  return { id: ref.id, ...data };
};

const update = async (id, data) => {
  const ref = col.doc(id);
  const doc = await ref.get();
  if (!doc.exists) return null;
  const updates = { ...data };
  delete updates.createdAt;
  await ref.update(updates);
  return { id, ...doc.data(), ...updates };
};

const remove = async (id) => {
  const doc = await col.doc(id).get();
  if (!doc.exists) return false;
  await col.doc(id).delete();
  return true;
};

const archive = async (id) => {
  const ref = col.doc(id);
  const doc = await ref.get();
  if (!doc.exists) return null;
  await ref.update({ archived: true, archivedAt: new Date().toISOString() });
  return { id, ...doc.data(), archived: true };
};

const restore = async (id) => {
  const ref = col.doc(id);
  const doc = await ref.get();
  if (!doc.exists) return null;
  await ref.update({ archived: false, archivedAt: null });
  return { id, ...doc.data(), archived: false };
};

const getArchived = async () => {
  const snapshot = await col.get();
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() })).filter(u => u.archived);
};

const checkEmail = async (email, excludeId = null) => {
  const snapshot = await col.get();
  return snapshot.docs.some(d => {
    const data = d.data();
    return data.email.toLowerCase() === email.toLowerCase() && d.id !== excludeId && !data.archived;
  });
};

const getStats = async () => {
  const snapshot = await col.get();
  const users    = snapshot.docs.map(d => d.data()).filter(u => !u.archived);
  const total    = users.length;
  const withAge  = users.filter(u => u.age);
  const avgAge   = withAge.length ? Math.round(withAge.reduce((s, u) => s + u.age, 0) / withAge.length) : null;
  const youngest = withAge.length ? Math.min(...withAge.map(u => u.age)) : null;
  const oldest   = withAge.length ? Math.max(...withAge.map(u => u.age)) : null;
  const hommes   = users.filter(u => u.genre === 'Masculin').length;
  const femmes   = users.filter(u => u.genre === 'Féminin').length;
  return { total, avgAge, youngest, oldest, hommes, femmes };
};

module.exports = { getAll, getById, create, update, remove, archive, restore, getArchived, checkEmail, getStats };
