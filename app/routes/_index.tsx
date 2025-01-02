import type {
  ActionFunctionArgs,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { LinksFunction } from "@remix-run/node";
import {
  Form,
  json,
  Link,
  Links,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { url } from "node:inspector";
import HotelList from "~/components/HotelList";
import ItineraryList from "~/components/ItineraryList";
import Section from "~/components/Section";
import Title from "~/components/Title";
import { Invite } from "~/schema/invite";
import { InviteType } from "./admin";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type LoaderData = {
  name: string | null;
  invite: InviteType;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const name = url.searchParams.get("name");

  const invite = await Invite.findOne({ name });

  return json({ name, invite });
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const accept = (await formData.get("accept")) as string;
  const email = (await formData.get("email")) as string;
  const requirements = (await formData.get("requirements")) as string;
  const song = (await formData.get("song")) as string;
  const name = (await formData.get("name")) as string;

  await Invite.findOneAndUpdate(
    { name },
    {
      accept: accept === "true" ? true : false,
      email,
      requirements,
      song,
    }
  );

  return null;
}

export default function Index() {
  const data = useLoaderData<LoaderData>();
  let { pathname, search } = useLocation();

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
        </div>

        <img
          src="img/Frames-10.png"
          className="absolute t-8 object-cover left-0 right-0 top-0 p-4 hidden lg:block"
        />
      </div>

      <div className="flex items-center justify-center gap-4 p-2 bg-theme-green text-white font-header sticky top-0 z-50 text-sm md:text-base">
        <Link to={`${pathname}${search}#itinerary`} className="">
          Itinerary
        </Link>
        <Link to={`${pathname}${search}#proposal`} className="">
          The proposal
        </Link>

        <Link to={`${pathname}${search}#accomodation`} className="">
          Accomodation
        </Link>
        <Link to={`${pathname}${search}#faq`} className="">
          FAQ
        </Link>
      </div>

      <Section classes="" id="itinerary">
        <div className="mb-8 text-center">
          <Title title="Your Itinerary" />
        </div>

        {data.invite?.friday ? (
          <div className="mb-4 max-w-[600px] mx-auto text-center mb-16">
            <img
              src="img/Table and Dining-30.jpg"
              className="w-[90px] mb-2 mx-auto"
            />
            <Title
              title="Friday night"
              subTitle="TBC but in Macc, hopefully ChesterGate Bistro SK11 6DY"
            />

            <p>
              We’re kicking off the weekend with a special dinner for family and
              close friends on Friday night – stay tuned for more details coming
              your way soon!
            </p>
          </div>
        ) : null}

        <div className="flex relative z-10 gap-8 flex-col md:flex-row md:items-center justify-center mb-12">
          {data.invite?.category === "day" ? (
            <div className="md:w-1/2 text-center">
              <div className="min-h-[100px] flex items-center justify-center">
                <img src="img/church.jpg" className="w-[80px] mb-2 mx-auto" />
              </div>

              <Title title="Wedding" subTitle="Gawsworth Hall - SK11 9RN" />
              <ItineraryList
                items={[
                  {
                    time: "12pm",
                    description:
                      "Meet Shane at Picturedrome (SK11 6DU) – let’s kick things off!",
                  },
                  {
                    time: "1pm",
                    description:
                      "Hop on board - we'll whisk you to Gawsworth Hall (transport provided).",
                  },
                  {
                    time: "2pm",
                    description:
                      "It’s officially happening – let’s tie the knot!",
                  },
                  {
                    time: "3pm",
                    description:
                      "Pop the fizz and grab some nibbles – time to celebrate in the beautiful gardens at Gawsworth Hall.",
                  },
                  {
                    time: "5pm",
                    description:
                      "The party continues at The Button Warehouse – we’ve got transport covered to get you there in style!",
                  },
                ]}
              />
            </div>
          ) : null}

          <div className="md:w-1/2 text-center">
            <div className="min-h-[100px] flex items-center justify-center">
              <img
                src="img/hand-glass.jpg"
                className="w-[100px] mb-2 mx-auto"
              />
            </div>

            <Title title="Party" subTitle="Button Warehouse - SK11 6BA" />
            <ItineraryList
              items={[
                {
                  time: "6pm",
                  description:
                    "Welcome evening guests – the party’s just getting started!",
                },
                {
                  time: "7pm",
                  description: "Time to feast! Let’s dig in.",
                },
                {
                  time: "8pm",
                  description: "Get your groove on – it’s boogie time.",
                },
                {
                  time: "9pm",
                  description: "Cake cutting – let’s make it sweet!",
                },
                {
                  time: "11:20pm",
                  description: "Last call at the bar – grab your final drink.",
                },
                {
                  time: "11:30pm",
                  description:
                    "It’s time to say goodbye to the newlyweds – but don’t worry, the memories will last forever!",
                },
              ]}
            />
          </div>
        </div>

        {data.invite?.sunday ? (
          <div className="mb-4 max-w-[600px] mx-auto text-center mb-16">
            <img
              src="img/Food and Meals-02.jpg"
              className="w-[90px] mb-2 mx-auto"
            />
            <Title
              title="Before you go...."
              subTitle="Our gaff, 245 Western Avenue SK118AW"
            />

            <p>
              Before you say farewell to Macclesfield, swing by Kim & Shane’s
              for a post-celebration brew and breakfast nibble from 9:30am
              onwards, on Sunday! Come join us for a little more fun before you
              head home.
            </p>
          </div>
        ) : null}
      </Section>

      <Section classes="bg-green-900/10 relative">
        <div className="flex relative z-10 gap-8 flex-col md:flex-row md:items-center">
          <div className="md:w-1/3">
            <img
              src="img/1st-pic.jpg"
              alt="Remix Logo"
              className=" w-full rounded shadow-lg"
            />
          </div>
          <div className="md:w-1/3">
            <img
              src="img/17.jpg"
              alt="Remix Logo"
              className="w-full rounded shadow-lg"
            />
          </div>
          <div className="md:w-1/3">
            <img
              src="img/pic2.jpg"
              alt="Remix Logo"
              className="w-full rounded shadow-lg"
            />
          </div>
        </div>
      </Section>

      <Section>
        <div
          className="flex relative z-10 gap-8 flex-col md:flex-row"
          id="rsvp"
        >
          <div className="md:w-1/2">
            <img src="img/dove.jpg" className="w-[50px] mb-2" />

            {data.name && data.name === data.invite?.name ? (
              <>
                <Title
                  title={`Hey ${data.name}, we would love for you to join us.`}
                />

                <p className="">
                  We're getting married on September 13, 2025. We'd love for you
                  to join us.
                </p>
              </>
            ) : (
              <>
                <Title title={`Hello there..`} />

                <p>
                  If you've come here to RSVP and the link we have sent you
                  isn't showing a form, please contact us.
                </p>
              </>
            )}
          </div>
          <div className="md:w-1/2">
            {data.name && data.name === data.invite?.name ? (
              <>
                {typeof data.invite?.accept === "undefined" ? (
                  <Form method="post" className="">
                    <input type="hidden" name="name" value={data.name} />
                    <fieldset className="mt-8 mb-8">
                      <legend className="mb-2 uppercase font-header">
                        Are you coming? (required)
                      </legend>
                      <div className="flex mb-2 items-center">
                        <input
                          id="default-radio-1"
                          type="radio"
                          value="true"
                          name="accept"
                          required
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-radio-1"
                          className="ms-2 text-sm font-medium"
                        >
                          Yes I would love to come
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="default-radio-2"
                          type="radio"
                          value="false"
                          name="accept"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-radio-2"
                          className="ms-2 text-sm font-medium"
                        >
                          Sorry I can't make it
                        </label>
                      </div>
                    </fieldset>
                    <label htmlFor="name" className="block mt-8">
                      <span className="uppercase font-header">
                        Your Email (optional - we’ll keep you posted for any
                        updates via this email)
                      </span>
                      <input
                        type="email"
                        placeholder="Your email"
                        className="border border-green-900 rounded-lg p-2 mt-2 block"
                        name="email"
                      />
                    </label>

                    <label htmlFor="name" className="block mt-8">
                      <span className="uppercase font-header">
                        Any dietary requirements or things we need to know?
                        (Optional)
                      </span>
                      <textarea
                        className="border border-green-900 rounded-lg p-2 mt-2 block"
                        name="requirements"
                      ></textarea>
                    </label>

                    <label htmlFor="name" className="block mt-8">
                      <span className="uppercase font-header">
                        What song will make you get up on the dance floor?
                        (Optional, but encouraged)
                      </span>
                      <input
                        type="text"
                        className="border border-green-900 rounded-lg p-2 mt-2 block"
                        name="song"
                      />
                    </label>

                    <button className="bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded-lg mt-8">
                      Submit
                    </button>
                  </Form>
                ) : (
                  <>
                    <Title title={`Thank you for your submission`} />
                    <p className="font-header mb-4">
                      Cheers for letting us know! If anything changes contact
                      Kim or Shane.
                    </p>

                    <p>You answered: </p>

                    <ul>
                      <li>Accept: {data.invite.accept ? "Yes" : "No"}</li>
                      <li>Email: {data.invite.email}</li>
                      <li>Requirements: {data.invite.requirements}</li>
                      <li>Song: {data.invite.song}</li>
                    </ul>
                  </>
                )}
              </>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </Section>

      <Section classes="bg-green-900/10 relative" id="proposal">
        <div className="flex relative z-10 gap-12 flex-col md:flex-row md:items-center">
          <div className="md:w-2/3">
            <img src="img/ring-box.png" alt="" className="w-[50px] mb-4" />
            <Title title="An energetic proposal" />

            <p className="mb-4">
              The Col De Rates, Spain. The summit of a 10km cycle climb, with an
              average gradient of 6.6% was - in Shane’s mind - a perfect
              location for a proposal.
            </p>

            <p className="mb-4">
              Reaching the top, both dripping in sweat. Shane’s spandex was in a
              twist and he was rapidly losing control of his words, brain and
              legs.
              <br />
              Instead of opting for a traditional one knee, Shane squats low
              before awkwardly trying to extract the sweaty ring box from his
              jersey pocket. He’s crying, unable to speak properly. It's a weak
              start to the performance. Nevertheless he whips the box out, and
              presents it at chest height to to his prospective 5ft wife.
            </p>

            <p className="mb-4">
              Unfortunately it was a windy day and the box had an overly large
              flap of material that was covering the ring. Instead of Kim
              realising that this was a big life moment, she thought her partner
              was passing out, potentially being sick while holding something
              wet (lets not forget she's as blind as a bat). Confusion was all
              over her face.
            </p>

            <p className="mb-4">
              After an awkward period of time passed with nothing happening
              Shane said, through floods of tears,{" "}
              <strong>“What you saying then?”</strong>. Ever the romantic
              gentleman. Clarity was returning. Raising from the cramp inducing
              squat position, the flap was lifted. The realisation kicked in,
              Kim's laughing (wtf) and, finally, the answer was{" "}
              <strong>YES</strong>.
            </p>

            <p>Just another 30 hilly miles to go.</p>
          </div>
          <div className="md:w-1/3 flex justify-center items-center">
            <img
              src="img/260adeaa-7e33-4332-96bd-ca78c4b0a222.jpeg"
              className="mx-auto mt-8 rounded shadow-lg"
            />
          </div>
        </div>

        {/* <div className="h-[300px] w-[300px] rounded-full bg-red-500 absolute -left-24 bottom-24 bg-teal-600/20"></div> */}
      </Section>

      <Section classes="" id="accomodation">
        <div className="relative">
          <img
            src="img/Table and Dining-03 copy.jpg"
            className="w-[150px] mb-2"
          />
          <Title title="Places to Stay" />

          <p className="mb-4">
            We’ve picked out some local hotels for you - and all should be
            visible on{" "}
            <a
              className="underline"
              href="https://www.booking.com/searchresults.en-gb.html?ss=Macclesfield&ssne=Macclesfield&ssne_untouched=Macclesfield&efdco=1&label=gog235jc-1DCAMoUEIYbWFjY2xlc2ZpZWxkLWFpcmVib3JvdWdoSAlYA2hQiAEBmAEJuAEHyAEM2AED6AEB-AECiAIBqAIDuAL-7tW7BsACAdICJDcwMmRlZjAyLTFjMWMtNGNjZi05ZjU4LTNlNmQ1NGI3ZTE3NdgCBOACAQ&aid=356980&lang=en-gb&sb=1&src_elem=sb&src=searchresults&dest_id=-2602369&dest_type=city&checkin=2025-09-12&checkout=2025-09-13&group_adults=2&no_rooms=1&group_children=0"
            >
              Booking.com
            </a>{" "}
            - but if you need any advice or a personal recommendation, just give
            us a shout – we’re happy to help! We’re also just a 20 min train
            ride from Manchester if you fancy a stay in the City, last trains
            will be about 10pm though, and taxi a bit pricy.
          </p>
          <HotelList
            items={[
              {
                name: "Airbnb",
                href: "https://www.airbnb.co.uk/s/Macclesfield/homes?checkin=2025-09-12&checkout=2025-09-13&date_picker_type=calendar&adults=2&guests=2&refinement_paths%5B%5D=%2Fhomes&search_type=AUTOSUGGEST",
                description:
                  "Try your luck with an Airbnb if that's your thing",
              },
              {
                name: "BoHotel",
                href: "https://www.bohotel.co.uk/",
                description:
                  "Smart hotel right in center - not many rooms. They have various properties BoHotel, BoHouse, BoHome",
              },
              {
                name: "Sleep Eat Repeat (0.1 miles)",
                href: "https://sleepeatrepeat.co.uk/",
                description: "Nice B&B in the centre of Macclesfield. 3 rooms.",
              },
              {
                name: "Travelodge Macclesfield central (0.2 miles)",
                href: "https://www.travelodge.co.uk/hotels/412/Macclesfield-Central-hotel?checkIn=13/09/2025&checkOut=14/09/2025&rooms[0][adults]=2&rooms[0][children]=0",
                description: "Very central just over road from station.",
              },
              {
                name: "The Tytherington Club (1.7 miles)",
                href: "https://www.thetytheringtonclub.com/",
                description:
                  "Golf Club and Spa in nearby village. Half hour walk or taxi",
              },
              {
                name: "Premier Inn Macclesfield South (1.9 miles)",
                href: "https://www.premierinn.com/gb/en/hotels/england/cheshire/macclesfield/macclesfield-south-west.html?ARRdd=13&ARRmm=09&ARRyyyy=2025&NIGHTS=1&ROOMS=1&ADULT1=2&CHILD1=0&COT1=0&INTTYP1=DB",
                description: "Will need a taxi into town from here.",
              },
              {
                name: "Premier Inn Macclesfield North (2.1 miles)",
                href: "https://www.premierinn.com/gb/en/hotels/england/cheshire/macclesfield/macclesfield-north.html?ARRdd=13&ARRmm=09&ARRyyyy=2025&NIGHTS=1&ROOMS=1&ADULT1=2&CHILD1=0&COT1=0&INTTYP1=DB",
                description: "Will need a taxi into town from here.",
              },
              {
                name: "Legh Arms (2.2 miles)",
                href: "https://legharmsprestbury.pub/",
                description:
                  "Swanky Prestbury village pub hotel. Quite remote will need taxi into Macc",
              },
              {
                name: "The Bridge (2.2 miles)",
                href: "https://www.bridgecheshire.co.uk/",
                description:
                  "Swanky Prestbury village pub hotel. Quite remote will need taxi into Macc",
              },
              {
                name: "Hollin House Hotel (3.9 miles)",
                href: "#",
                description: "In Bollington Village, will need taxi into Macc",
              },
              {
                name: "Shrigley Hall Hotel and Spa (5.7 miles)",
                href: "#",
                description:
                  "Spa and Hotel on outskirts of Macclesfield. Will need taxi into Macc",
              },
            ]}
          />
        </div>

        <div className="mb-4 max-w-[600px] mx-auto text-center mt-12">
          {/* <img
            src="img/Food and Meals-02.jpg"
            className="w-[90px] mb-2 mx-auto"
          /> */}
          <Title title="Taxi reccomendations" />

          <ul>
            <li>Uber</li>
            <li>Silvertown Taxis - 01625 616666</li>
            <li>Macclesfield Taxis - 01625 724028</li>
          </ul>
        </div>

        {/* <div className="h-[300px] w-[300px] rounded-full bg-red-500 absolute -left-24 bottom-24 bg-teal-600/20"></div> */}
      </Section>

      <Section classes="bg-green-900/10  text-center" id="faq">
        <Title title="FAQ" />

        <div className="max-w-[600px] mx-auto">
          <details className="mb-8" open>
            <summary className="font-header text-2xl text-theme-green cursor-pointer">
              What should I wear?
            </summary>
            <p>
              We're keeping it relaxed, so feel free to rock smart-casual – wear
              whatever makes you feel comfy and fabulous! Shane might even be
              sporting lycra!
            </p>
          </details>

          <details className="mb-8" open>
            <summary className="font-header text-2xl text-theme-green cursor-pointer">
              Will there be parking available?
            </summary>
            <p>
              Everything’s happening right in the heart of Macclesfield, and
              don’t worry – there are loads of car parks nearby.
            </p>
          </details>
          <details className="mb-8" open>
            <summary className="font-header text-2xl text-theme-green cursor-pointer">
              Are children welcome?
            </summary>
            <p>
              We absolutely adore your little ones, but for this special day,
              we’re keeping it adults-only so we can all kick back and enjoy the
              celebration. We hope this gives you the perfect excuse to let your
              hair down and have some fun!
            </p>
          </details>
          <details className="mb-8" open>
            <summary className="font-header text-2xl text-theme-green cursor-pointer">
              Will you accommodate my dietary requirements?
            </summary>
            <p>
              Got any dietary needs or allergies? No worries – just let us know
              when you RSVP! If it slips your mind, no worries – give Kim a
              shout ASAP, and we’ll sort it out.
            </p>
          </details>
          <details className="mb-8" open>
            <summary className="font-header text-2xl text-theme-green cursor-pointer">
              Tell me more about the wedding venue
            </summary>
            <p>
              Ceremony (immediate family only) <br />
              Gawsworth House is a real gem – full of history, romance, and a
              touch of intrigue! This beautiful Cheshire home has been passed
              down through only five families since Norman times and is now the
              lovely abode of Elizabeth Richards and her sons, Rupert and
              Jonathan. We can't wait for you to enjoy a few hours with us in
              this charming spot! <br />
              <br />
              The Button Warehouse (evening party) <br />
              Nestled just off Chestergate, down a secret little alley, you’ll
              find this charming hideaway that really comes alive with its
              exposed brick and twinkling fairy lights. Keep an eye out for the
              A-board, then head through the door on the left in the tunnel and
              straight up the stairs to find our private event space for the
              evening.
            </p>
          </details>
          <details className="mb-8" open>
            <summary className="font-header text-2xl text-theme-green cursor-pointer">
              A note on gifts
            </summary>
            <p>
              The best gift you can give us is your presence on our big day — we
              can't wait to celebrate with you! We know weddings can be pricey,
              so please don't feel any pressure. But if you're thinking of
              giving us something, we'd love a little help with our honeymoon
              fund as we embark on an unforgettable adventure through Asia.
            </p>
          </details>

          <details className="mb-8" open>
            <summary className="font-header text-2xl text-theme-green cursor-pointer">
              Where can I see photos from the day?
            </summary>
            <p>
              Keep an eye on this space for photos! We’ll send the details to
              the email you provide, so you won’t miss a thing!
            </p>
          </details>
        </div>
      </Section>

      <div
        style={{ backgroundImage: `url("img/37.jpg")` }}
        className="h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      >
        <div className="bg-theme-green max-w-[500px] text-center absolute bottom-0 left-0 right-0 p-8 mx-auto z-20 -rotate-6 ">
          <p className="font-header text-white text-3xl uppercase">
            Hope to see you on the 13th
          </p>
        </div>
      </div>
    </>
  );
}
