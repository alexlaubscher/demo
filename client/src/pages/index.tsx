/* eslint-disable @next/next/no-img-element */
import { FormEvent, useCallback, useState } from "react";
import {
  CheckBadgeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import { classNames } from "@/utils/styles";

const CONTACT_FORM_ENDPOINT = "http://127.0.0.1:8000/contact";

const HomePage = () => {
  // TODO (k): Transition this to use Tailwind `brand` custom color.
  const COMPANY_PERSONALIZATION = {
    IMAGE: "https://github.com/Exafunction/codeium.vim/raw/main/codeium.svg",
    BACKGROUND: "bg-green-600",
    BACKGROUND_HOVER: "hover:bg-green-500",
    OUTLINE: "outline-green-600",
    TEXT: "text-green-600",
    FOCUS_RING: "focus:ring-green-400",
  };

  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!agreed) {
        setError(new Error("You must agree to the terms and conditions"));
        return;
      }

      // Form values to send to the server.
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData);

      // Send the data to the server.
      setError(null);
      setIsLoading(true);
      setSuccess(false);
      fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          if (response.ok) {
            setSuccess(true);
            return response.text();
          }
          const error = await response.json();
          throw new Error(error["detail"]);
        })
        .catch((error: Error) => setError(error))
        .finally(() => setIsLoading(false));
    },
    [agreed]
  );

  return (
    <div className="isolate bg-white px-6 pt-12 pb-24">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#a2fc89] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <img
          alt="company-logo"
          src={COMPANY_PERSONALIZATION.IMAGE}
          width="300"
          height="100"
          className="m-auto"
        />
        <p className="mt-4 text-lg leading-8 text-gray-600">
          Contact us! We would love to get in touch.
        </p>
      </div>
      <form className="mx-auto mt-8 max-w-xl" onSubmit={handleSubmit}>
        {success && (
          <div className="rounded-md bg-red-50 p-4 my-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckBadgeIcon
                  className="h-5 w-5 text-green-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Message Sent
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>We&apos;ll be in touch soon!</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="rounded-md bg-red-50 p-4 my-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon
                  className="h-5 w-5 text-red-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error Submitting
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error.message}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${COMPANY_PERSONALIZATION.FOCUS_RING} sm:text-sm sm:leading-6`}
                defaultValue="K"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${COMPANY_PERSONALIZATION.FOCUS_RING} sm:text-sm sm:leading-6`}
                defaultValue="H"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                name="email"
                id="email"
                autoComplete="email"
                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${COMPANY_PERSONALIZATION.FOCUS_RING} sm:text-sm sm:leading-6`}
                defaultValue="testemail"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows={4}
                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${COMPANY_PERSONALIZATION.FOCUS_RING} sm:text-sm sm:leading-6`}
                defaultValue="I'm interested in learning more about your product. Please email me back!"
              />
            </div>
          </div>
          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? COMPANY_PERSONALIZATION.BACKGROUND : "bg-gray-200",
                  "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? "translate-x-3.5" : "translate-x-0",
                    "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{" "}
              <a
                href="#"
                className={`font-semibold ${COMPANY_PERSONALIZATION.TEXT}`}
              >
                privacy&nbsp;policy
              </a>
              .
            </Switch.Label>
          </Switch.Group>
        </div>
        <div className="my-10">
          <button
            type="submit"
            className={`block w-full rounded-md ${COMPANY_PERSONALIZATION.BACKGROUND} px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm ${COMPANY_PERSONALIZATION.BACKGROUND_HOVER} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:${COMPANY_PERSONALIZATION.OUTLINE}`}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Let's talk"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
