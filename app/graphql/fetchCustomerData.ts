// fetchCustomerData.ts
export const CUSTOMER_DETAILS_QUERY = `

  fragment Customer on Customer {

    id

    email

    firstName

    lastName

    phone

    orders(first: 5) {

      edges {

        node {

          id

          name

          orderNumber

          processedAt

          financialStatus

          fulfillmentStatus

          totalPriceSet {

            presentmentMoney {

              amount

              currencyCode

            }

          }

        }

      }

    }

    }
  `;

async function generateCustomerAccessToken(email: string, password: string) {
  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': 'your_storefront_api_access_token',
    },
    body: JSON.stringify({
      query: `
        mutation {
          customerAccessTokenCreate(input: {email: "${email}", password: "${password}"}) {
            customerAccessToken {
              accessToken
              expiresAt
            }
            userErrors {
              field
              message
            }
          }
        }
      `,
    }),
  });

  const { data } = await response.json() as { data: { customerAccessTokenCreate: { customerAccessToken: { accessToken: string } } } };
  return data.customerAccessTokenCreate.customerAccessToken.accessToken;
}

async function fetchCustomerData(email: string, password: string) {
  // Step 1: Generate customer access token
  const accessToken = await generateCustomerAccessToken(email, password);

  // Step 2: Use the access token to fetch customer details
  const customerResponse = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': 'your_storefront_api_access_token',
    },
    body: JSON.stringify({
      query: `
        query CustomerDetails($customerAccessToken: String!) {
          customer(customerAccessToken: $customerAccessToken) {
            ...Customer
          }
        }
        ${CUSTOMER_DETAILS_QUERY}
      `,
      variables: { customerAccessToken: accessToken },
    }),
  });

  const { data } = await customerResponse.json() as { data: { customer: any } };
  return data.customer;
}
export { fetchCustomerData };
