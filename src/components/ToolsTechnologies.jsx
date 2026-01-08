'use client';
import Image from 'next/image';

export default function ToolsTechnologies() {
  const tools = [
    { src: '/images/tools/python.png', name: 'Python' },
    { src: '/images/tools/GoogleColab.png', name: 'Google Colab' },
    { src: '/images/tools/numpy.png', name: 'NumPy' },
    { src: '/images/tools/pandas.png', name: 'Pandas' },
    { src: '/images/tools/matplotlib.png', name: 'Matplotlib' },
    { src: '/images/tools/seaborn.png', name: 'Seaborn' },
    { src: '/images/tools/mysql.png', name: 'MySQL' },
    { src: '/images/tools/sklearn.png', name: 'Scikit-learn' },
    { src: '/images/tools/tensorflow.png', name: 'TensorFlow' },
    { src: '/images/tools/pytorch.png', name: 'PyTorch' },
    { src: '/images/tools/LangChain.png', name: 'LangChain' },
    { src: '/images/tools/Llamaindex.png', name: 'LlamaIndex' },
    { src: '/images/tools/Keras.png', name: 'Keras' },
    { src: '/images/tools/HuggingFace.png', name: 'Hugging Face' },
    { src: '/images/tools/openai.png', name: 'OpenAI' },
    { src: '/images/tools/Mlflow.png', name: 'MLflow' },
    { src: '/images/tools/kubeflow.png', name: 'Kubeflow' },
    { src: '/images/tools/docker.png', name: 'Docker' },
    { src: '/images/tools/kubernetes.png', name: 'Kubernetes' },
    { src: '/images/tools/chromaDB.png', name: 'ChromaDB' },
    { src: '/images/tools/pinecone.png', name: 'Pinecone' },
    { src: '/images/tools/apacheairflow.png', name: 'Apache Airflow' },
    { src: '/images/tools/DVC.png', name: 'DVC' },
    { src: '/images/tools/aws.png', name: 'AWS' },
  ];

  return (
    <section
      id="tools"
      className="bg-gradient-to-b from-white via-slate-50 to-white py-16"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Tools & Technologies <span className="text-[#AD1612]">You’ll Master</span>
          </h2>
          <p className="mt-2 text-slate-600">
            Industry-standard stack for Machine Learning, Deep Learning, MLOps, and Cloud AI.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-8 place-items-center">
          {tools.map((tool, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              
              {/* Icon */}
              <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center justify-center p-2 hover:shadow-md transition">
                <Image
                  src={tool.src}
                  alt={tool.name}
                  fill
                  className="object-contain p-2"
                />
              </div>

              {/* Name */}
              <span className="text-xs sm:text-sm text-slate-700 text-center font-medium">
                {tool.name}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-slate-600 text-center">
          Gain hands-on experience with the most in-demand technologies in AI & ML.
        </p>
      </div>
    </section>
  );
}
