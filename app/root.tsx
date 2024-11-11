import { useNonce, getShopAnalytics, Analytics } from '@shopify/hydrogen';
import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useRouteError,
  ScrollRestoration,
  isRouteErrorResponse,
  type ShouldRevalidateFunction,
} from '@remix-run/react';
import favicon from '~/assets/favicon.svg';
import resetStyles from '~/styles/reset.css';
import appStyles from '~/styles/app.css'; // Ensure this path is correct
import tailwindCss from '~/styles/tailwind.css';
import { PageLayout } from '~/components/PageLayout';
import { FOOTER_QUERY, HEADER_QUERY } from '~/lib/fragments';
import React from 'react';
import { Helmet } from 'react-helmet';

export type RootLoader = typeof loader;

export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}) => {
  if (formMethod && formMethod !== 'GET') return true;
  if (currentUrl.toString() === nextUrl.toString()) return true;
  return defaultShouldRevalidate;
};

export function links() {
  return [
    { rel: 'stylesheet', href: tailwindCss },
    { rel: 'stylesheet', href: resetStyles },
    { rel: 'stylesheet', href: appStyles }, // Ensure this path is correct
    { rel: 'preconnect', href: 'https://cdn.shopify.com' },
    { rel: 'preconnect', href: 'https://shop.app' },
    { rel: 'icon', type: 'image/svg+xml', href: favicon },
  ];
}

export async function loader(args: LoaderFunctionArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  const { storefront, env } = args.context;

  return defer({
    critical: criticalData,
    deferred: deferredData,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language,
    },
  });
}

async function loadCriticalData({ context }: LoaderFunctionArgs) {
  const { storefront } = context;
  const [header] = await Promise.all([
    storefront.query(HEADER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        headerMenuHandle: 'main-menu',
      },
    }),
  ]);
  return { header };
}

function loadDeferredData({ context }: LoaderFunctionArgs) {
  const { storefront, customerAccount, cart } = context;
  const footer = storefront.query(FOOTER_QUERY, {
    cache: storefront.CacheLong(),
    variables: { footerMenuHandle: 'footer' },
  }).catch(handleError);
  return {
    cart: cart.get(),
    isLoggedIn: customerAccount.isLoggedIn(),
    footer,
  };
}

const handleError = (error: any): null => {
  console.error(error);
  return null;
};

export default function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My App</title>
      </Helmet>
      <div>
        {/* Your content here */}
      </div>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const errorMessage = isRouteErrorResponse(error)
    ? error.data.message
    : (error as Error)?.message ?? 'Unknown error';
  return (
    <>
      <Meta />
      <div>
        <h1>There was an error</h1>
        <p>{errorMessage}</p>
      </div>
      <Scripts />
    </>
  );
}