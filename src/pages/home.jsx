import { Container, Text, Code, UsaceBox, TextLink, Hero } from "@usace/groundwork";
import CopyButton from "../components/CopyButton";

const base = import.meta.env.BASE_URL;

function Home() {
  return (
    <>
      <Hero
        image={`${base}nww-lucky-peak-dam.jpg`}
        title="Groundwork"
        subtitle="React Component Library"
      />

      <Container>
        <div className="mt-6">
          <UsaceBox title="Welcome">
            <Text>Welcome to the homepage</Text>
          </UsaceBox>
          <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
            <UsaceBox title="Getting Started">
              <div className="flex flex-row justify-start space-between items-center gap-2 mb-3">
                <Code className="block w-full p-1 px-2">
                  npm install @usace/groundwork-water
                </Code>
                <CopyButton text="npm install @usace/groundwork" />
              </div>

              <Text>
                Then, import the components you need and our CSS, and start
                building your application
              </Text>
              <div className="mt-3">
                <TextLink href="/docs" className="text-lg font-bold">
                  Check out the docs
                </TextLink>
              </div>
            </UsaceBox>
            <UsaceBox
              customTitle={() => {
                return (
                  <span>
                    <span className="inline-block">Contributing</span>
                  </span>
                );
              }}
            >
              <Text>
                Contributions are welcome! Please see the{" "}
                <TextLink href="https://github.com/USACE-WaterManagement/groundwork-water">
                  GitHub Repository
                </TextLink>{" "}
                for more information.
              </Text>
            </UsaceBox>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Home;
