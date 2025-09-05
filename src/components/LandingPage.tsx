import React from 'react';
import { SignInButton, SignUpButton, useUser } from '@clerk/clerk-react';
import { Search, Briefcase, Users, TrendingUp, Star, CheckCircle, ArrowRight, Building, MapPin, Clock } from 'lucide-react';

interface LandingPageProps {
  onGetJob: () => void;
  onPostJob: () => void;
}

export default function LandingPage({ onGetJob, onPostJob }: LandingPageProps) {
  const { isSignedIn, user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TalentHub</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Testimonials</a>
            </div>

            <div className="flex items-center space-x-4">
              {isSignedIn ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Welcome, {user?.firstName}</span>
                  <img 
                    src={user?.imageUrl} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className="text-gray-600 hover:text-blue-600 transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Get Started
                    </button>
                  </SignUpButton>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Dream Job or
            <span className="text-blue-600 block">Perfect Candidate</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect talented professionals with innovative companies. Our AI-powered platform makes recruitment smarter, faster, and more effective.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {isSignedIn ? (
              <>
                <button
                  onClick={onGetJob}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Find Jobs</span>
                </button>
                <button
                  onClick={onPostJob}
                  className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Briefcase className="w-5 h-5" />
                  <span>Post Jobs</span>
                </button>
              </>
            ) : (
              <>
                <SignUpButton mode="modal">
                  <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                    <Search className="w-5 h-5" />
                    <span>Find Jobs</span>
                  </button>
                </SignUpButton>
                <SignUpButton mode="modal">
                  <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                    <Briefcase className="w-5 h-5" />
                    <span>Post Jobs</span>
                  </button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose TalentHub?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with human insight to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Matching</h3>
              <p className="text-gray-600">
                Our AI algorithm matches candidates with jobs based on skills, experience, and cultural fit.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Analytics</h3>
              <p className="text-gray-600">
                Track application performance and get insights to optimize your hiring process.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Driven</h3>
              <p className="text-gray-600">
                Join a thriving community of professionals and companies building the future together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to find your perfect match</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Job Seekers */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">For Job Seekers</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Create Your Profile</h4>
                    <p className="text-gray-600">Build a comprehensive profile showcasing your skills and experience.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Get Matched</h4>
                    <p className="text-gray-600">Our AI finds jobs that perfectly match your skills and preferences.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Land Your Dream Job</h4>
                    <p className="text-gray-600">Apply with confidence and start your new career journey.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Employers */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">For Employers</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Post Your Job</h4>
                    <p className="text-gray-600">Create detailed job listings with specific requirements and expectations.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Review Candidates</h4>
                    <p className="text-gray-600">Get pre-screened candidates that match your exact criteria.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Hire Top Talent</h4>
                    <p className="text-gray-600">Connect with the best candidates and build your dream team.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Success stories from our community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "TalentHub helped me find my dream job in just 2 weeks. The matching algorithm is incredibly accurate!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">SJ</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Johnson</div>
                  <div className="text-gray-600">Software Engineer</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "We've hired 15 amazing developers through TalentHub. The quality of candidates is outstanding."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">MC</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Mike Chen</div>
                  <div className="text-gray-600">CTO, TechStart</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The platform is intuitive and the support team is fantastic. Highly recommend to anyone job hunting!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">ER</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Emily Rodriguez</div>
                  <div className="text-gray-600">Product Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have found success with TalentHub.
          </p>
          
          {isSignedIn ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onGetJob}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Start Job Search</span>
              </button>
              <button
                onClick={onPostJob}
                className="bg-blue-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-900 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Briefcase className="w-5 h-5" />
                <span>Post a Job</span>
              </button>
            </div>
          ) : (
            <SignUpButton mode="modal">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <ArrowRight className="w-5 h-5" />
                <span>Get Started Today</span>
              </button>
            </SignUpButton>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">TalentHub</span>
              </div>
              <p className="text-gray-400">
                Connecting talent with opportunity through innovative technology.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Job Seekers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Advice</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resume Builder</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Post Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Find Candidates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TalentHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}