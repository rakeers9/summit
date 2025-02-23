import React from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  ListChecks,
  FileText,
  Sliders,
  BarChart,
} from 'lucide-react';

const CompanySection = () => {
  return (
    <section id="company" className="py-16">
      <div className="content-container text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">For Companies</h2>
        <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
          Streamline your data labeling projects with our integrated tools.
          Upload images, configure custom prompts, and track progress—all within one intuitive platform.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="modern-card p-8">
            <UploadCloud className="h-8 w-8 mb-4 text-[var(--gradient-end)]" />
            <h3 className="text-xl font-semibold mb-3 text-text-dark">
              Easy Uploads
            </h3>
            <p className="text-gray-600">
              Support for ZIP files and folder uploads, making it effortless to kick off your project.
            </p>
          </div>
          <div className="modern-card p-8">
            <ImageIcon className="h-8 w-8 mb-4 text-[var(--gradient-end)]" />
            <h3 className="text-xl font-semibold mb-3 text-text-dark">
              Smart Prompts
            </h3>
            <p className="text-gray-600">
              Define custom tasks—whether it's classification or segmentation—and let our platform handle the rest.
            </p>
          </div>
          <div className="modern-card p-8">
            <ListChecks className="h-8 w-8 mb-4 text-[var(--gradient-end)]" />
            <h3 className="text-xl font-semibold mb-3 text-text-dark">
              Real‑Time Queue Tracking
            </h3>
            <p className="text-gray-600">
              Monitor project progress with an intuitive dashboard showing completed entries and what's still pending.
            </p>
          </div>
          <div className="modern-card p-8">
            <FileText className="h-8 w-8 mb-4 text-[var(--gradient-end)]" />
            <h3 className="text-xl font-semibold mb-3 text-text-dark">
              Professional Data Labeling
            </h3>
            <p className="text-gray-600">
              Get expert data labeling services tailored to your project's needs, ensuring high-quality, accurate results.
            </p>
          </div>
          <div className="modern-card p-8">
            <Sliders className="h-8 w-8 mb-4 text-[var(--gradient-end)]" />
            <h3 className="text-xl font-semibold mb-3 text-text-dark">
              A/B Testing Capabilities
            </h3>
            <p className="text-gray-600">
              Run controlled experiments to optimize your data pipelines and user interactions with built-in A/B testing tools.
            </p>
          </div>
          <div className="modern-card p-8">
            <BarChart className="h-8 w-8 mb-4 text-[var(--gradient-end)]" />
            <h3 className="text-xl font-semibold mb-3 text-text-dark">
              Advanced Analytics
            </h3>
            <p className="text-gray-600">
              Dive deep into project metrics with comprehensive analytics, empowering data-driven decision-making.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanySection;