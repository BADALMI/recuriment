import React from 'react';

interface SalaryBenchmarkProps {}

const SalaryBenchmark: React.FC<SalaryBenchmarkProps> = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Salary Benchmark</h1>
      <p className="text-gray-600">Salary benchmarking tools will be available here.</p>
    </div>
  );
};

export default SalaryBenchmark;