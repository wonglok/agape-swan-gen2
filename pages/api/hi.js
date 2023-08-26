export default async function (req, res) {
  return res.status(200).json({ text: "hi", rand: Math.random() });
}
