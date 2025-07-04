// type FooterColumnProps = {
//   title: string;
//   items: string[];
// };

// const FooterColumn = ({ title, items }: FooterColumnProps) => (
//   <div>
//     <h4 className="font-semibold mb-4">{title}</h4>
//     <ul className="space-y-2 text-muted-foreground text-sm">
//       {items.map((item) => (
//         <li
//           key={item}
//           className="hover:text-purple-600 cursor-pointer transition-colors duration-200"
//         >
//           {item}
//         </li>
//       ))}
//     </ul>
//   </div>
// );

export default function Footer() {
  // const footerData = [
  //   {
  //     title: "Produk",
  //     items: ["Fitur", "Harga", "Integrasi", "Template"],
  //   },
  //   {
  //     title: "Sumber Daya",
  //     items: ["Blog", "Dokumentasi", "Komunitas", "Dukungan"],
  //   },
  //   {
  //     title: "Perusahaan",
  //     items: ["Tentang Kami", "Karir", "Kontak", "Kebijakan Privasi"],
  //   },
  // ];

  return (
    <footer className="mt-0 pt-8 pb-6 md:border-t border-gray-200 dark:border-gray-800">
      {/* <div className="max-w-6xl mx-auto px-4 hidden md:grid grid-cols-4 gap-8">
        <div>
          <div className="flex items-center  gap-2 mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1.5 rounded-lg">
              <Wand2 className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-bold">WeiAI</h3>
          </div>
          <p className="text-muted-foreground text-sm">
            Alat canggih untuk membuat caption media sosial dengan bantuan AI.
          </p>
        </div>

        {footerData.map((column) => (
          <FooterColumn
            key={column.title}
            title={column.title}
            items={column.items}
          />
        ))}
      </div> */}

      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} WeiAI. Hak cipta dilindungi.
      </div>
    </footer>
  );
}
