import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  Users, 
  Eye, 
  Edit, 
  Trash2, 
  ChevronLeft,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Star,
  Send,
  Menu,
  X
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  tags: string[];
  category: string;
}

interface EmployerDashboardProps {
  onBack: () => void;
  onAddJob: (job: Omit<Job, 'id' | 'posted'>) => void;
}

const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ onBack, onAddJob }) => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [showJobForm, setShowJobForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: '',
    tags: '',
    category: 'General'
  });

  // Mock posted jobs data
  const [postedJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior Data Scientist',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$150k - $200k',
      posted: '2 days ago',
      description: 'We are looking for a senior data scientist to join our growing team...',
      requirements: ['PhD in Data Science', '5+ years experience', 'Python/R expertise'],
      tags: ['Data Science', 'Machine Learning', 'Python'],
      category: 'Data Science & Data Engineering'
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'TechCorp Inc.',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120k - $160k',
      posted: '1 week ago',
      description: 'Lead product strategy and development for our core platform...',
      requirements: ['Product management experience', 'Technical background', 'Leadership skills'],
      tags: ['Product', 'Strategy', 'Leadership'],
      category: 'Product Management'
    }
  ]);

  const categories = [
    'General',
    'Actuarial & Underwriting',
    'Data Science & Data Engineering',
    'Product Management',
    'Catastrophe Modeling',
    'Machine Learning & Predictive Modeling'
  ];

  const handleJobFormChange = (field: string, value: string) => {
    setJobForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitJob = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newJob = {
      title: jobForm.title,
      company: jobForm.company,
      location: jobForm.location,
      type: jobForm.type,
      salary: jobForm.salary,
      description: jobForm.description,
      requirements: jobForm.requirements.split('\n').filter(req => req.trim()),
      tags: jobForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      category: jobForm.category
    };

    onAddJob(newJob);
    
    // Reset form
    setJobForm({
      title: '',
      company: '',
      location: '',
      type: 'Full-time',
      salary: '',
      description: '',
      requirements: '',
      tags: '',
      category: 'General'
    });
    
    setShowJobForm(false);
    setActiveTab('jobs');
  };

  const renderSidebar = () => (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden p-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Employer Portal</h2>
          </div>
          
          <nav className="p-4">
            <div className="space-y-2">
              <button
                onClick={() => {
                  setActiveTab('jobs');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'jobs' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Briefcase className="w-5 h-5" />
                <span>Posted Jobs</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('candidates');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'candidates' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Candidates</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('analytics');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'analytics' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span>Analytics</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );

  const renderJobForm = () => (
    <div className="flex-1 p-4 lg:p-6">
      {/* Mobile Header */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Post New Job</h1>
          <button
            onClick={() => setShowJobForm(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmitJob} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
              <input
                type="text"
                required
                value={jobForm.title}
                onChange={(e) => handleJobFormChange('title', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Senior Data Scientist"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
              <input
                type="text"
                required
                value={jobForm.company}
                onChange={(e) => handleJobFormChange('company', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="TechCorp Inc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                required
                value={jobForm.location}
                onChange={(e) => handleJobFormChange('location', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="San Francisco, CA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Type *</label>
              <select
                required
                value={jobForm.type}
                onChange={(e) => handleJobFormChange('type', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range *</label>
              <input
                type="text"
                required
                value={jobForm.salary}
                onChange={(e) => handleJobFormChange('salary', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="$150k - $200k"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                required
                value={jobForm.category}
                onChange={(e) => handleJobFormChange('category', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
            <textarea
              required
              rows={4}
              value={jobForm.description}
              onChange={(e) => handleJobFormChange('description', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Requirements (one per line) *</label>
            <textarea
              required
              rows={4}
              value={jobForm.requirements}
              onChange={(e) => handleJobFormChange('requirements', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="PhD in Data Science&#10;5+ years experience&#10;Python/R expertise"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={jobForm.tags}
              onChange={(e) => handleJobFormChange('tags', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Data Science, Machine Learning, Python"
            />
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all"
            >
              Post Job
            </button>
            <button
              type="button"
              onClick={() => setShowJobForm(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderJobs = () => (
    <div className="flex-1 p-4 lg:p-6">
      {/* Mobile Header */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Posted Jobs</h1>
        <button
          onClick={() => setShowJobForm(true)}
          className="px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Post New Job</span>
          <span className="sm:hidden">Post Job</span>
        </button>
      </div>

      <div className="space-y-4">
        {postedJobs.map((job) => (
          <div key={job.id} className="bg-white border border-gray-200 rounded-xl p-4 lg:p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
                <p className="text-purple-600 font-medium mb-2">{job.company}</p>
                
                <div className="flex flex-wrap gap-2 lg:gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {job.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-sm text-gray-500">Posted {job.posted}</p>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>245 views</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Send className="w-4 h-4" />
                  <span>12 applications</span>
                </span>
              </div>
              <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium">
                View Applications
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCandidates = () => (
    <div className="flex-1 p-4 lg:p-6">
      {/* Mobile Header */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Candidate Pool</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No candidates yet</h3>
          <p className="text-gray-500">Candidates who apply to your jobs will appear here</p>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="flex-1 p-4 lg:p-6">
      {/* Mobile Header */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Analytics</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">2</span>
          </div>
          <h3 className="font-semibold text-gray-800">Active Jobs</h3>
          <p className="text-sm text-gray-500">Currently posted</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">487</span>
          </div>
          <h3 className="font-semibold text-gray-800">Total Views</h3>
          <p className="text-sm text-gray-500">This month</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Send className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">23</span>
          </div>
          <h3 className="font-semibold text-gray-800">Applications</h3>
          <p className="text-sm text-gray-500">This month</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">4.8</span>
          </div>
          <h3 className="font-semibold text-gray-800">Company Rating</h3>
          <p className="text-sm text-gray-500">Average score</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Job Performance</h3>
        <div className="text-center py-8">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Detailed analytics will be available here</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {renderSidebar()}
      
      {showJobForm ? (
        renderJobForm()
      ) : (
        <>
          {activeTab === 'jobs' && renderJobs()}
          {activeTab === 'candidates' && renderCandidates()}
          {activeTab === 'analytics' && renderAnalytics()}
        </>
      )}
    </div>
  );
};

export default EmployerDashboard;