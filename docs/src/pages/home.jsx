import { Container, Text, Code, UsaceBox, TextLink, Hero } from "@usace/groundwork";
import CopyButton from "../components/CopyButton";

const BASE_URL = import.meta.env.BASE_URL;

function Home() {
  return (
    <>
      <Hero
        image={`${BASE_URL}FT_GIBSON_20181115.min.jpg`}
        title="Groundwork Water"
        subtitle="React Component Library for USACE Water Management"
      />

      <Container>
        <div className="mt-6">
          <UsaceBox title="Welcome">
            <Text>Welcome to the homepage</Text>
          </UsaceBox>
          <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
            <UsaceBox title="Getting Started">
              <div className="flex flex-row justify-start space-between items-center gap-2 mb-3">
                <Text>Install:</Text>
                <Code className="block w-full p-1 px-2">
                  npm install @usace-watermanagement/groundwork-water
                </Code>
                <CopyButton text="npm install @usace-watermanagement/groundwork-water" />
              </div>
              <div className="flex flex-row justify-start space-between items-center gap-2 mb-3">
                <Text>Uninstall: </Text>
                <Code className="block w-full p-1 px-2">
                  npm uninstall @usace-watermanagement/groundwork-water
                </Code>
                <CopyButton text="npm uninstall @usace-watermanagement/groundwork-water" />
              </div>
              <Text>
                To update Groundwork Water, run the uninstall command and then the
                install command. Confirm in your package.json that the version number
                has been updated.
              </Text>

              <Text>
                Then, import the components you need and our CSS, and start building
                your application!
              </Text>
              <div className="mt-3">
                <TextLink href={`${BASE_URL}#/docs`} className="text-lg font-bold">
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
