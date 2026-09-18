export const metadata = {
  title: 'GPT 5.2 Website',
  description: 'A clean AI chat web app powered by GPT 5.2',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
