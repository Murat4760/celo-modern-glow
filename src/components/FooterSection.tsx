const FooterSection = () => {
  return (
    <footer className="border-t border-copper py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-3">
          <div>
            <h3 className="text-copper-gradient mb-4 text-2xl font-bold">
              CELO
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Modern Anatolian cuisine in the heart of the city.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Hours
            </h4>
            <p className="text-sm text-muted-foreground">
              Every Day
              <br />
              11:30 AM – 2:00 AM
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h4>
            <p className="text-sm text-muted-foreground">
              info@celorestaurant.com
              <br />
              +90 212 555 0199
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} CELO Restaurant. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
