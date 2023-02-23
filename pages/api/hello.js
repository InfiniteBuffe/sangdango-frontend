// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const config = {
  runtime: "edge",
  unstable_allowDynamic: [
    '**/node_modules/lodash/_root.js', // use a glob to allow anything in the function-bind 3rd party module
  ],
};

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
