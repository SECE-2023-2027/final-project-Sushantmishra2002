import clientPromise from '../../../lib/mongodb';

export async function GET(req) {
  const client = await clientPromise;
  const db = client.db();
  const userId = new URL(req.url).searchParams.get('userId');
  const filter = userId ? { userId } : {};
  const blogs = await db.collection('blogs').find(filter).sort({ createdAt: -1 }).toArray();
  return Response.json(blogs.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest })));
}

export async function POST(req) {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection('blogs').insertOne({
    title: body.title,
    content: body.content,
    userId: body.userId,
    createdAt: new Date().toISOString(),
  });
  return Response.json({ id: result.insertedId.toString(), ...body, createdAt: new Date().toISOString() });
}
