import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { url } from "node:inspector";
import ItineraryList from "~/components/ItineraryList";
import Section from "~/components/Section";
import Title from "~/components/Title";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const name = url.searchParams.get("name");
  return { name };
};

export default function Index() {
  const data = useLoaderData();

  console.log(data);

  return (
    <>
      <div className="relative flex bg-pink-100 p-8 overflow-hidden lg:pt-16">
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <h1 className="uppercase text-theme-green text-2xl md:text-4xl -rotate-6 font-light">
              We are tying <br /> the knot
            </h1>

            <img
              src="img/ring.png"
              className="w-[50px] md:w-[80px] lg:w-[100px]"
            />
          </div>

          <div className="mt-8 text-center">
            <img
              src="img/text.png"
              className="mx-auto w-[300px] md:w-[500px] mb-4"
            />

            <h2 className="uppercase text-theme-green text-3xl md:text-6xl">
              Kim & Shane
            </h2>
            <h3 className="font-normal text-xl md:text-4xl">13.09.25</h3>
          </div>

          {/* 
<p>13.09.25</p> */}
        </div>

        <img
          src="img/Frames-10.png"
          className="absolute t-8 object-cover left-0 right-0 top-0 p-4 hidden lg:block"
        />
      </div>

      <div className="flex items-center justify-center gap-4 p-4 bg-theme-green text-white font-header">
        <a href="#rsvp" className="">
          RSVP
        </a>
        <a href="#itinerary" className="">
          Itinerary
        </a>
      </div>

      <Section>
        <div
          className="flex relative z-10 gap-8 flex-col md:flex-row md:items-center"
          id="rsvp"
        >
          <div className="md:w-1/2">
            <img src="img/dove.jpg" className="w-[50px] mb-2" />

            <Title title={`Hey ${data.name}, please come to our wedding.`} />

            <p className="">
              We're getting married on September 13, 2025. We'd love for you to
              join us.
            </p>
          </div>
          <div className="md:w-1/2">
            <form className="">
              <label htmlFor="name" className="block mt-8">
                <span className="uppercase">Your Email</span>
                <input
                  type="email"
                  placeholder="Your email"
                  className="border border-green-900 rounded-lg p-2 mt-2 block"
                />
              </label>

              <fieldset className="mt-8 mb-8">
                <legend className="mb-2 uppercase">Are you coming?</legend>
                <div className="flex mb-2 items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value="true"
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Yes I would love to come
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value="false"
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-2"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Sorry I can't make it
                  </label>
                </div>
              </fieldset>

              <button className="bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded-lg">
                Submit
              </button>
            </form>
          </div>
        </div>
      </Section>

      <Section classes="bg-green-900/10 relative">
        <div className="flex relative z-10 gap-8 flex-col md:flex-row md:items-center">
          <div className="md:w-1/3">
            <img
              src="img/28.jpg"
              alt="Remix Logo"
              className="object-cover w-full h-full shadow"
            />
          </div>
          <div className="md:w-1/3">
            <img
              src="img/17.jpg"
              alt="Remix Logo"
              className="object-cover w-full h-full shadow"
            />
          </div>
          <div className="md:w-1/3">
            <img
              src="img/37.jpg"
              alt="Remix Logo"
              className="object-cover w-full h-full shadow"
            />
          </div>
        </div>
      </Section>

      <Section classes="">
        <div
          className="flex relative z-10 gap-8 flex-col md:flex-row md:items-center justify-center"
          id="itinerary"
        >
          <div className="md:w-1/2 text-center">
            <img src="img/church.jpg" className="w-[90px] mb-2 mx-auto" />

            <Title title="Wedding" />
            <ItineraryList
              items={[
                {
                  time: "12:30pm",
                  description: "Pre wedding meet before heading to venue",
                },
                {
                  time: "1:30pm",
                  description: "Arrive - Gawsworth Hall",
                },
                {
                  time: "2pm",
                  description: "Ceremony",
                },
                {
                  time: "3pm",
                  description: "Photos + Drinks and nibbles in the garden",
                },
                {
                  time: "5pm",
                  description:
                    "Head to The Button Warehouse (Transport provided)",
                },
              ]}
            />
          </div>

          <div className="md:w-1/2 text-center">
            <img src="img/hand-glass.jpg" className="w-[100px] mb-2 mx-auto" />

            <Title title="Party" />
            <ItineraryList
              items={[
                {
                  time: "12:30pm",
                  description: "Pre wedding meet before heading to venue",
                },
                {
                  time: "1:30pm",
                  description: "Arrive - Gawsworth Hall",
                },
                {
                  time: "2pm",
                  description: "Ceremony",
                },
                {
                  time: "3pm",
                  description: "Photos + Drinks and nibbles in the garden",
                },
                {
                  time: "5pm",
                  description:
                    "Head to The Button Warehouse (Transport provided)",
                },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section classes="bg-green-900/10 relative">
        <div className="flex relative z-10 gap-12 flex-col md:flex-row md:items-center">
          <div className="md:w-2/3">
            <img src="img/ring-box.png" alt="" className="w-[50px] mb-4" />
            <Title title="An energetic proposal" />

            <p></p>
          </div>
          <div className="md:w-1/3 flex justify-center items-center">
            <img
              src="img/260adeaa-7e33-4332-96bd-ca78c4b0a222.jpeg"
              className="mx-auto mt-8"
            />
          </div>
        </div>

        {/* <div className="h-[300px] w-[300px] rounded-full bg-red-500 absolute -left-24 bottom-24 bg-teal-600/20"></div> */}
      </Section>

      <Section classes="">
        <div className="relative">
          <img
            src="img/Table and Dining-03 copy.jpg"
            className="w-[150px] mb-2"
          />

          <Title title="Places to Stay" />

          <ul className="grid grid-cols-4 gap-4">
            <li className="bg-pink-50 p-4">
              <h2 className="text-l mb-8">
                Travelodge Macclesfield central (0.2 miles)
              </h2>
              <p className="text-sm">Some text about this hotel</p>
            </li>
            <li className="bg-pink-50 p-4">
              <h2 className="text-l mb-8">The Tytherington Club (1.7 miles)</h2>
            </li>
            <li className="bg-pink-50 p-4">
              <h2 className="text-l mb-8">
                Premier Inn Macclesfield North (1.9 miles)
              </h2>
            </li>
            <li className="bg-pink-50 p-4">
              <h2 className="text-l mb-8">
                Premier Inn Macclesfield South (1.9 miles)
              </h2>
            </li>
            <li className="bg-pink-50 p-4">
              <h2 className="text-l mb-8">Hollin House Hotel (3.9 miles)</h2>
            </li>
            <li className="bg-pink-50 p-4">
              <h2 className="text-l mb-8">
                Shrigley Hall Hotel and Spa (5.7 miles)
              </h2>
            </li>
          </ul>
        </div>

        {/* <div className="h-[300px] w-[300px] rounded-full bg-red-500 absolute -left-24 bottom-24 bg-teal-600/20"></div> */}
      </Section>

      <Section classes="bg-green-900/10  text-center">
        <Title title="FAQ" />

        <details className="mb-4">
          <summary className="font-header text-2xl text-theme-green">
            What should I wear?
          </summary>
          <p>We recommend semi-formal attire. Please avoid wearing white.</p>
        </details>
        <details className="mb-4">
          <summary className="font-header text-2xl text-theme-green">
            Can I bring a plus one?
          </summary>
          <p>Due to limited space, we are unable to accommodate plus ones.</p>
        </details>
        <details className="mb-4">
          <summary className="font-header text-2xl text-theme-green">
            Will there be parking available?
          </summary>
          <p>Yes, there will be ample parking available at the venue.</p>
        </details>
        <details className="mb-4">
          <summary className="font-header text-2xl text-theme-green">
            Are children welcome?
          </summary>
          <p>
            While we love your kids, we request that the event be adults-only.
          </p>
        </details>
      </Section>

      <div
        style={{ backgroundImage: `url("img/37.jpg")` }}
        className="h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      >
        <div className="bg-green-900 max-w-[500px] text-center absolute bottom-0 left-0 right-0 p-8 mx-auto z-20 -rotate-6 ">
          <p className="font-header text-white text-3xl uppercase">
            Hope to see you on the 13th
          </p>
        </div>
      </div>
    </>
  );
}
