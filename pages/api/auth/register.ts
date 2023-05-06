import dbConnect from '@libs/mongoose';
import User from '@models/user';

export default async function handler(req, res) {
  if (req.method === "POST") {
    dbConnect().catch((error) => {
      console.log(error);
      res.json({ error: "Connection Failed...!" });
    });

    if (!req.body)
      return res.status(404).json({ error: "Don't have form data...!" });
    const { username, email, password } = req.body;

    // check duplicate users
    const checkExisting = await User.findOne({ email });

    if (checkExisting) {
      return res.status(422).json({ message: "User Already Exists...!" });
    }

    const user = await User.create({ name: username, email, password });
    res.status(201).json({ user });
  }
}
