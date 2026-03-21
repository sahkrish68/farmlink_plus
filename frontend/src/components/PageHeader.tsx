type Props = {
    title: string;
    text?: string;
    badge?: string;
  };
  
  export default function PageHeader({ title, text, badge = "Farmlink Plus" }: Props) {
    return (
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-card">
            <div className="page-hero-subtitle">{badge}</div>
            <h1>{title}</h1>
            {text && <p>{text}</p>}
          </div>
        </div>
      </section>
    );
  }