import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  const client = await clientPromise;
  const db = client.db();
  const blog = await db.collection('blogs').findOne({ _id: new ObjectId(params.id) });
  if (!blog) return new Response('Not found', { status: 404 });
  const { _id, ...rest } = blog;
  return Response.json({ id: _id.toString(), ...rest });
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db();
  await db.collection('blogs').updateOne(
    { _id: new ObjectId(params.id) },
    { $set: { title: body.title, content: body.content } }
  );
  return Response.json({ id: params.id, ...body });
}

export async function DELETE(req, { params }) {
  const client = await clientPromise;
  const db = client.db();
  await db.collection('blogs').deleteOne({ _id: new ObjectId(params.id) });
  return new Response('Deleted', { status: 204 });
}
