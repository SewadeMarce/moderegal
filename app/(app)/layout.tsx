import Navbar from "@/components/(app)/NavBar";
import Footer from "@/components/(app)/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <div className="min-h-screen flex flex-col">
       <Navbar /> 
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>


  );
}
