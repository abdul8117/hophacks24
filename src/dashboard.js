import { withPageAuthRequired } from '@auth0/nextjs-auth0';

function ProtectedPage() {
  return <div>This page is protected and only visible to authenticated users.</div>;
}

export default withPageAuthRequired(ProtectedPage);
