import Layout from '@/components/Layout';
import NutrientChart from '@/components/NutrientChart';
import UploadForm from '@/components/UploadForm';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row min-h-screen justify-between">
        {/* Left side with chart */}
        <div className="w-full md:w-1/2 p-6">
          <NutrientChart />
        </div>

        {/* Right side with form */}
        <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
          <UploadForm />
        </div>
      </div>
    </Layout>
  );
}

