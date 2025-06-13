import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Mail,
  MapPin,
  Shield,
  Clock,
  Users,
  Lock,
  Eye,
  RefreshCw,
} from 'lucide-react';

export default function PrivacyPolicy() {
  const sections = [
    {
      id: 1,
      title: 'Information We Collect',
      icon: <Eye className='w-5 h-5' />,
      subsections: [
        {
          title: 'Personal Information',
          content:
            'When you register, sign up for our beta, request a demo, or contact us, we may collect your name, email address, job title, company name, and payment information.',
        },
        {
          title: 'Usage Information',
          content:
            'We collect data on how you interact with Sourzer, including IP addresses, browser types, device data, pages visited, and time spent on the platform.',
        },
        {
          title: 'Candidate Data',
          content:
            'When you upload resumes or connect third-party platforms (e.g., LinkedIn, ATS), we process candidate-related data you provide or access.',
        },
      ],
    },
    {
      id: 2,
      title: 'How We Use Your Information',
      icon: <Users className='w-5 h-5' />,
      content: [
        'To provide and improve the Sourzer platform',
        'To personalise your user experience',
        'To process transactions and manage subscriptions',
        'To send administrative messages and product updates',
        'To analyse platform usage and optimise our services',
        'To comply with legal obligations',
      ],
    },
    {
      id: 3,
      title: 'Sharing of Information',
      icon: <Shield className='w-5 h-5' />,
      content: 'We do not sell your data. We may share information with:',
      list: [
        'Service providers under contractual obligations (e.g., hosting, analytics, payments)',
        'Law enforcement or regulatory authorities, when required',
        'In the event of a merger, acquisition, or asset sale',
      ],
    },
    {
      id: 4,
      title: 'Data Retention & Security',
      icon: <Lock className='w-5 h-5' />,
      content:
        'We retain personal data only as long as necessary. We implement reasonable technical and organisational security measures to protect your information.',
    },
    {
      id: 5,
      title: 'Your Rights',
      icon: <Users className='w-5 h-5' />,
      content:
        'Depending on your jurisdiction, you may have rights to access, correct, or delete your personal information, or object to data processing.',
      contact: true,
    },
    {
      id: 6,
      title: 'Cookies and Tracking',
      icon: <Eye className='w-5 h-5' />,
      content:
        'Sourzer uses cookies and similar tracking technologies to improve performance and user experience. You may adjust cookie preferences through your browser.',
    },
    {
      id: 7,
      title: 'Changes to This Policy',
      icon: <RefreshCw className='w-5 h-5' />,
      content:
        'We may update this policy periodically. We will notify you of material changes by email or through the platform.',
    },
  ];

  return (
    <div className='min-h-screen font-sans'>
      <div className='max-w-4xl mx-auto px-4 py-12'>
        {/* Header */}
        <div className='text-center mb-12'>
          <div className='flex items-center justify-center mb-4'>
            <Shield className='w-8 h-8 text-blue-600 mr-3' />
            <h1 className='text-3xl font-medium'>Privacy Policy</h1>
          </div>
          <div className='flex items-center justify-center space-x-4 mb-6'>
            <Badge variant='secondary' className='text-sm'>
              <Clock className='w-4 h-4 mr-1' />
              Effective Date: 12 June 2025
            </Badge>
          </div>
          <p className='text-md max-w-3xl mx-auto leading-relaxed'>
            At <span className='font-semibold text-blue-600'>Sourzer</span>,
            your privacy is important to us. This Privacy Policy explains how we
            collect, use, disclose, and protect your information when you use
            our website (www.sourzer.co), applications, and services
            (collectively, "Sourzer" or the "Service").
          </p>
        </div>

        {/* Privacy Sections */}
        <div className='space-y-6'>
          {sections.map((section) => (
            <Card
              key={section.id}
              className='shadow-sm border-0 backdrop-blur-sm'
            >
              <CardHeader>
                <CardTitle className='flex items-center text-xl'>
                  {section.icon}
                  <span className='ml-3'>
                    {section.id}. {section.title}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {section.subsections ? (
                  <div className='space-y-6'>
                    {section.subsections.map((subsection, index) => (
                      <div key={index}>
                        <h4 className='font-semibold  mb-2'>
                          {String.fromCharCode(97 + index)}. {subsection.title}
                        </h4>
                        <p className='text-muted-foreground leading-relaxed pl-4 border-l-2'>
                          {subsection.content}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : section.content && Array.isArray(section.content) ? (
                  <div className='space-y-2'>
                    {section.content.map((item, index) => (
                      <div key={index} className='flex items-start'>
                        <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                        <p className='leading-relaxed'>{item}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p className='leading-relaxed mb-3'>{section.content}</p>
                    {section.list && (
                      <div className='space-y-2 pl-4'>
                        {section.list.map((item, index) => (
                          <div key={index} className='flex items-start'>
                            <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                            <p className='leading-relaxed'>{item}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {section.contact && (
                      <div className='mt-4 p-4 bg-accent rounded-lg border'>
                        <a
                          className='flex items-center'
                          href='mailto:privacy@sourzer.co'
                        >
                          <Mail className='w-4 h-4 mr-2 text-blue-600' />
                          Contact us at:{' '}
                          <span className='font-semibold text-blue-600 ml-1'>
                            privacy@sourzer.co
                          </span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className='mt-8 bg-card/50 border-0'>
          <CardHeader>
            <CardTitle className='flex items-center text-xl'>
              <Mail className='w-5 h-5 mr-3' />
              8. Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='leading-relaxed mb-4'>Questions? Reach us at:</p>
            <div className='space-y-3'>
              <a className='flex items-center' href='mailto:privacy@sourzer.co'>
                <Mail className='w-4 h-4 mr-3 text-blue-600' />
                <span className='font-semibold text-blue-600'>
                  privacy@sourzer.co
                </span>
              </a>
              <div className='flex items-center'>
                <MapPin className='w-4 h-4 mr-3 text-blue-600' />
                <span>Sourzer, [Insert Address]</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <Separator className='my-8' />
        <div className='text-center text-sm text-muted-foreground'>
          <p>© 2025 Sourzer. All rights reserved.</p>
          <p className='mt-1'>
            This privacy policy was last updated on 12 June 2025.
          </p>
        </div>
      </div>
    </div>
  );
}
