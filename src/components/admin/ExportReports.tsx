
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon, 
  BarChart3, 
  Users, 
  FileSpreadsheet, 
  Database,
  TrendingUp,
  Activity,
  Shield,
  MessageSquare,
  Flag,
  Clock,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

const ExportReports = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });
  const [exportFormat, setExportFormat] = useState('csv');
  const [reportType, setReportType] = useState('all');
  const [isExporting, setIsExporting] = useState(false);
  const [lastExportTime, setLastExportTime] = useState<Date | null>(null);

  // Quick Reports Data
  const quickReports = [
    {
      title: 'User Activity Summary',
      description: 'Overview of user registrations, story submissions, and engagement',
      icon: Users,
      color: 'blue',
      action: () => generateQuickReport('user_activity')
    },
    {
      title: 'Content Moderation Report',
      description: 'Flagged content, moderation actions, and violation trends',
      icon: Shield,
      color: 'red',
      action: () => generateQuickReport('moderation')
    },
    {
      title: 'Analytics Dashboard',
      description: 'Page views, user sessions, and platform engagement metrics',
      icon: BarChart3,
      color: 'green',
      action: () => generateQuickReport('analytics')
    },
    {
      title: 'Security & Compliance',
      description: 'Security incidents, rate limiting violations, and compliance status',
      icon: Activity,
      color: 'orange',
      action: () => generateQuickReport('security')
    }
  ];

  // Export Categories
  const exportCategories = [
    {
      name: 'User Data',
      icon: Users,
      tables: ['profiles', 'user_roles', 'user_privacy_settings'],
      description: 'User profiles, roles, and privacy settings'
    },
    {
      name: 'Content Data',
      icon: FileText,
      tables: ['stories', 'comments', 'reactions'],
      description: 'Stories, comments, and user reactions'
    },
    {
      name: 'Moderation Data',
      icon: Flag,
      tables: ['content_moderation', 'blocked_entities'],
      description: 'Moderation actions and blocked content'
    },
    {
      name: 'Analytics Data',
      icon: TrendingUp,
      tables: ['analytics_events', 'rate_limits'],
      description: 'User analytics and rate limiting data'
    },
    {
      name: 'Community Data',
      icon: MessageSquare,
      tables: ['community_posts', 'bookmarks'],
      description: 'Community posts and user bookmarks'
    }
  ];

  const generateQuickReport = async (type: string) => {
    setIsExporting(true);
    try {
      let reportData: any[] = [];
      let filename = '';

      switch (type) {
        case 'user_activity':
          const { data: userData } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });
          reportData = userData || [];
          filename = `user_activity_report_${format(new Date(), 'yyyy-MM-dd')}.csv`;
          break;

        case 'moderation':
          const { data: moderationData } = await supabase
            .from('content_moderation')
            .select('*')
            .order('created_at', { ascending: false });
          reportData = moderationData || [];
          filename = `moderation_report_${format(new Date(), 'yyyy-MM-dd')}.csv`;
          break;

        case 'analytics':
          const { data: analyticsData } = await supabase
            .from('analytics_events')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1000);
          reportData = analyticsData || [];
          filename = `analytics_report_${format(new Date(), 'yyyy-MM-dd')}.csv`;
          break;

        case 'security':
          const { data: securityData } = await supabase
            .from('rate_limits')
            .select('*')
            .order('created_at', { ascending: false });
          reportData = securityData || [];
          filename = `security_report_${format(new Date(), 'yyyy-MM-dd')}.csv`;
          break;
      }

      if (reportData.length > 0) {
        const csv = convertToCSV(reportData);
        downloadFile(csv, filename, 'text/csv');
        setLastExportTime(new Date());
        toast({
          title: "Report generated successfully",
          description: `${type.replace('_', ' ')} report has been exported.`
        });
      } else {
        toast({
          title: "No data found",
          description: "No data available for the selected report type.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Export failed",
        description: "Failed to generate the report.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportCategoryData = async (category: typeof exportCategories[0]) => {
    setIsExporting(true);
    try {
      const allData: any = {};

      for (const table of category.tables) {
        let query = supabase.from(table).select('*');

        // Apply date filtering if applicable
        if (dateRange.from && dateRange.to) {
          query = query
            .gte('created_at', dateRange.from.toISOString())
            .lte('created_at', dateRange.to.toISOString());
        }

        const { data, error } = await query.order('created_at', { ascending: false });
        
        if (error) throw error;
        allData[table] = data || [];
      }

      if (exportFormat === 'csv') {
        // Export each table as a separate CSV file in a zip-like structure
        for (const [tableName, data] of Object.entries(allData)) {
          if ((data as any[]).length > 0) {
            const csv = convertToCSV(data as any[]);
            const filename = `${category.name.toLowerCase().replace(' ', '_')}_${tableName}_${format(new Date(), 'yyyy-MM-dd')}.csv`;
            downloadFile(csv, filename, 'text/csv');
          }
        }
      } else {
        // Export as JSON
        const jsonData = JSON.stringify(allData, null, 2);
        const filename = `${category.name.toLowerCase().replace(' ', '_')}_export_${format(new Date(), 'yyyy-MM-dd')}.json`;
        downloadFile(jsonData, filename, 'application/json');
      }

      setLastExportTime(new Date());
      toast({
        title: "Export completed",
        description: `${category.name} has been exported successfully.`
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: "Export failed",
        description: "Failed to export the selected data.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          const stringValue = typeof value === 'object' && value !== null 
            ? JSON.stringify(value).replace(/"/g, '""')
            : String(value || '').replace(/"/g, '""');
          return `"${stringValue}"`;
        }).join(',')
      )
    ].join('\n');
    return csvContent;
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      red: 'bg-red-500/20 text-red-400 border-red-500/30',
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
            Export & Reports
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-1">
            Generate comprehensive reports and export platform data
          </p>
        </div>
        {lastExportTime && (
          <div className="flex items-center gap-2 text-xs md:text-sm text-slate-400">
            <Clock className="w-3 h-3" />
            Last export: {format(lastExportTime, 'MMM dd, HH:mm')}
          </div>
        )}
      </div>

      <Tabs defaultValue="quick-reports" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="quick-reports" className="data-[state=active]:bg-slate-700 text-xs md:text-sm">
            Quick Reports
          </TabsTrigger>
          <TabsTrigger value="data-export" className="data-[state=active]:bg-slate-700 text-xs md:text-sm">
            Data Export
          </TabsTrigger>
          <TabsTrigger value="custom-reports" className="data-[state=active]:bg-slate-700 text-xs md:text-sm">
            Custom Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quick-reports" className="space-y-4 md:space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-base md:text-lg">Pre-built Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {quickReports.map((report, index) => (
                  <div
                    key={index}
                    className="bg-slate-700/50 rounded-lg p-4 md:p-6 border border-slate-600 hover:border-slate-500 transition-colors"
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className={`p-2 md:p-3 rounded-lg ${getColorClasses(report.color)}`}>
                        <report.icon className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm md:text-base mb-2">
                          {report.title}
                        </h3>
                        <p className="text-slate-400 text-xs md:text-sm mb-3 md:mb-4">
                          {report.description}
                        </p>
                        <Button
                          onClick={report.action}
                          disabled={isExporting}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {isExporting ? 'Generating...' : 'Generate Report'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data-export" className="space-y-4 md:space-y-6">
          {/* Export Controls */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-base md:text-lg">
                <Filter className="w-4 h-4 md:w-5 md:h-5" />
                Export Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Date Range
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                      >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, 'LLL dd')} - {format(dateRange.to, 'LLL dd')}
                            </>
                          ) : (
                            format(dateRange.from, 'LLL dd, y')
                          )
                        ) : (
                          'Pick a date range'
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                        className="text-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Export Format
                  </label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="csv">CSV (Spreadsheet)</SelectItem>
                      <SelectItem value="json">JSON (Developer)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Report Type
                  </label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="all">All Data</SelectItem>
                      <SelectItem value="summary">Summary Only</SelectItem>
                      <SelectItem value="detailed">Detailed Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Categories */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-base md:text-lg">Data Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {exportCategories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-slate-700/50 rounded-lg p-4 md:p-6 border border-slate-600"
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="p-2 md:p-3 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg">
                        <category.icon className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm md:text-base mb-2">
                          {category.name}
                        </h3>
                        <p className="text-slate-400 text-xs md:text-sm mb-3">
                          {category.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-3 md:mb-4">
                          {category.tables.map((table) => (
                            <Badge key={table} variant="outline" className="border-slate-600 text-slate-300 text-xs">
                              {table}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          onClick={() => exportCategoryData(category)}
                          disabled={isExporting}
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-600 w-full sm:w-auto"
                        >
                          <FileSpreadsheet className="w-4 h-4 mr-2" />
                          {isExporting ? 'Exporting...' : 'Export Data'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom-reports" className="space-y-4 md:space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-base md:text-lg">Custom SQL Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Report Name
                  </label>
                  <Input
                    placeholder="Enter report name..."
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    SQL Query
                  </label>
                  <textarea
                    placeholder="SELECT * FROM analytics_events WHERE created_at >= '2024-01-01'..."
                    rows={8}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white font-mono text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none">
                    <Database className="w-4 h-4 mr-2" />
                    Execute Query
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 flex-1 sm:flex-none">
                    Save Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-base md:text-lg">Saved Report Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Database className="w-12 h-12 mx-auto text-slate-500 mb-4" />
                <p className="text-slate-400 text-sm md:text-base">No saved report templates yet.</p>
                <p className="text-slate-500 text-xs md:text-sm mt-2">
                  Create custom SQL reports and save them as templates for reuse.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExportReports;
