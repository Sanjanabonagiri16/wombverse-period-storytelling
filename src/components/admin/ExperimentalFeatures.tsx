
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Beaker } from 'lucide-react';

const ExperimentalFeatures = () => {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader className="flex flex-row items-center gap-2">
        <Beaker className="w-5 h-5 text-teal-300" />
        <CardTitle className="text-white">Experimental Features</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-gray-300">
          <strong>Test Drive</strong> upcoming features before public release.<br />
          Toggle features on or off for selected users or moderator roles.
        </div>
        <ul className="list-disc pl-6 text-sm text-teal-200 space-y-1">
          <li>Voice story submissions (beta)</li>
          <li>In-app wellness integrations</li>
          <li>Advanced notification controls</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default ExperimentalFeatures;
