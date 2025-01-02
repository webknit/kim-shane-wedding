import type {
  ActionFunctionArgs,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { LinksFunction } from "@remix-run/node";
import { Form, json, useLoaderData } from "@remix-run/react";
import { url } from "node:inspector";
import HotelList from "~/components/HotelList";
import ItineraryList from "~/components/ItineraryList";
import Section from "~/components/Section";
import Title from "~/components/Title";
import { Invite } from "~/schema/invite";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export interface InviteType {
  _id: string;
  name: string;
  encodedName: string;
  accept: string;
  email: string;
  requirements: string;
  song: string;
  category: string;
  sunday: boolean;
  friday: boolean;
}

type LoaderData = {
  name: string | null;
  invites: Array<InviteType>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const invites = await Invite.find({}).sort({ createdAt: -1 });

  return json({ invites });
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = (await formData.get("name")) as string;
  const category = (await formData.get("category")) as string;
  const sunday = (await formData.get("sunday")) as string;
  const friday = (await formData.get("friday")) as string;

  const encodedName = encodeURIComponent(name);

  const invite = await Invite.create({
    name,
    encodedName,
    category,
    sunday: sunday === "true" ? true : false,
    friday: friday === "true" ? true : false,
  });

  return null;
}

export default function Index() {
  const { name, invites } = useLoaderData<LoaderData>();

  return (
    <>
      <Section>
        <div className="flex relative z-10 gap-8 flex-col md:flex-row">
          <div className="md:w-1/2">
            <img src="img/dove.jpg" className="w-[50px] mb-2" />

            <Title title={`Admin`} />
          </div>
          <div className="md:w-1/2">
            <Form method="post" className="">
              <label htmlFor="name" className="block mt-8">
                <span className="uppercase font-header">Name</span>
                <input
                  type="text"
                  className="border border-green-900 rounded-lg p-2 mt-2 block"
                  name="name"
                />
              </label>

              <fieldset className="mt-8 mb-8">
                <legend className="mb-2 uppercase font-header">
                  Are you coming? (required)
                </legend>
                <div className="flex mb-2 items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value="day"
                    name="category"
                    required
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ms-2 text-sm font-medium"
                  >
                    Day/Night
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="default-radio-2"
                    type="radio"
                    value="night"
                    name="category"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-2"
                    className="ms-2 text-sm font-medium"
                  >
                    Night
                  </label>
                </div>
              </fieldset>

              <fieldset className="mt-8 mb-8">
                <legend className="mb-2 uppercase font-header">Sunday</legend>
                <div className="flex items-center">
                  <input
                    id="default-radio-2"
                    type="checkbox"
                    value="true"
                    name="sunday"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-2"
                    className="ms-2 text-sm font-medium"
                  >
                    Invite
                  </label>
                </div>
              </fieldset>

              <fieldset className="mt-8 mb-8">
                <legend className="mb-2 uppercase font-header">Friday</legend>
                <div className="flex items-center">
                  <input
                    id="default-radio-2"
                    type="checkbox"
                    value="true"
                    name="friday"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-2"
                    className="ms-2 text-sm font-medium"
                  >
                    Invite
                  </label>
                </div>
              </fieldset>

              <button className="bg-green-900 hover:bg-green-800 text-white px-4 py-2 rounded-lg mt-8">
                Submit
              </button>
            </Form>
          </div>
        </div>
      </Section>

      <Section>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Day/Night</th>
              <th className="p-4">Friday</th>
              <th className="p-4">Sunday</th>
              <th className="p-4">Link</th>
              <th className="p-4">Accept</th>
              <th className="p-4">Email</th>
              <th className="p-4">Requirements</th>
              <th className="p-4">Song</th>
            </tr>
          </thead>
          <tbody>
            {invites?.map((invite) => (
              <tr key={invite._id}>
                <td className="p-4">{invite.name}</td>
                <td className="p-4">{invite.category}</td>
                <td className="p-4">{invite.friday ? "True" : "false"}</td>
                <td className="p-4">{invite.sunday ? "True" : "false"}</td>
                <td className="p-4">
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `https://kim-shane-wedding.vercel.app/?name=${invite.encodedName}`
                      )
                    }
                    className="underline"
                  >
                    {invite.encodedName}
                  </button>
                </td>
                <td className="p-4">
                  {typeof invite.accept !== "undefined"
                    ? invite.accept
                      ? "True"
                      : "False"
                    : ""}
                </td>
                <td className="p-4">{invite.email}</td>
                <td className="p-4">{invite.requirements}</td>
                <td className="p-4">{invite.song}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </>
  );
}
