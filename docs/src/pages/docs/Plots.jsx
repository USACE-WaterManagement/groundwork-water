import { Container, UsaceBox, Hero } from "@usace/groundwork";
import { TSPlot } from "@usace-watermanagement/groundwork-water";

const base = import.meta.env.BASE_URL;

function Plots() {
  return (
    <>
      <Hero
        image={`${base}FT_GIBSON_20181115.jpg`}
        title="Groundwork"
        subtitle="React Component Library"
      />

      <Container>
        <div className="mt-6">
          <UsaceBox title="Welcome">
            <TSPlot />
          </UsaceBox>
        </div>
      </Container>
    </>
  );
}

export default Plots;
