import UserProfile from '@/components/UserProfile';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function Profile() {
  return <UserProfile />;
});
