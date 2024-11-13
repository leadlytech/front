import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Package, PanelBottom, ShoppingBag, Users, Settings } from "lucide-react"; // Corrigido para PanelBottom
import Link from "next/link";

export function Sidebar() {
  return (
    <div className="flex w-full flex-col bg-muted/40">


      <div className=" sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="
        sticky top-0 z-30 h-14 
        items-center px-4 border-b 
        bg-background gap-4 sm:static
        sm:h-auto sm:border-0
        sm:bg-transparent sm:px-6
        "
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button size= {"icon"} variant={ "outline"} className="sm:hidden"> 
                <PanelBottom className="w-5 h-5" /> 
                <span className="sr-only">Abrir / Fechar Menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent className="sm:max-w-x">
              <nav className="grid gap-6 text-lg font-medium">
                <Link 
                href="#"
                className="Flex h-10 w-10 bg-primary rounded-full text-lg
                items-center justify-center text-primary-foreground md:text-base gap-2
                "
                prefetch = {false}
                >
                  <Package className="h-5 w-5 transition-all"/>
                  <span className="sr-only">Logo</span>
                </Link>

                <Link 
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground
                "
                prefetch = {false}
                >
                  <Package className="h-5 w-5 transition-all"/>
                  <Home className="sr-only"/>Início
                </Link>

                
                <Link 
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground
                "
                prefetch = {false}
                >
                  <ShoppingBag className="h-5 w-5 transition-all"/>
                  Pedidos
                </Link>

                
                <Link 
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground
                "
                prefetch = {false}
                >
                  <Package className="h-5 w-5 transition-all"/>
                  Produtos
                </Link>

                
                <Link 
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground
                "
                prefetch = {false}
                >
                  <Users className="h-5 w-5 transition-all"/>
                  Clientes
                </Link>

                
                <Link 
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground
                "
                prefetch = {false}
                >
                  <Settings className="h-5 w-5 transition-all"/>
                  Configurações
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
}
