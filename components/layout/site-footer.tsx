export function SiteFooter() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} ITM CONNECT. All rights reserved.
        </p>
      </div>
    </footer>
  );
}