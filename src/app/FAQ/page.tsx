// pages/faq.tsx

const faqs = [
    {
      question: 'How can I track my order?',
      answer:
        'You can track your order by logging into your account and visiting the "My Orders" section.',
    },
    {
      question: 'What is your return policy?',
      answer:
        'We accept returns within 14 days of delivery, provided the item is in its original condition.',
    },
    {
      question: 'Do you offer international shipping?',
      answer:
        'Yes, we offer international shipping to most countries with some exceptions.',
    },
    {
      question: 'Do you offer international shipping?',
      answer:
        'Yes, we offer international shipping to most countries with some exceptions.',
    },
    {
      question: 'Do you offer international shipping?',
      answer:
        'Yes, we offer international shipping to most countries with some exceptions.',
    },
    {
      question: 'Do you offer international shipping?',
      answer:
        'Yes, we offer international shipping to most countries with some exceptions.',
    },
  ];
  
  export default function FAQPage() {
    return (
      <div className="min-h-screen bg-white py-12 px-5 mt-10 md:px-20">
        <h1 className="text-4xl font-bold text-center text-teal-600 mb-10">
          Frequently Asked Questions
        </h1>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group border border-gray-300 rounded-lg shadow-sm"
            >
              <summary className="cursor-pointer px-6 py-4 flex justify-between items-center text-lg font-medium text-gray-800">
                {faq.question}
                <span className="transition-transform duration-300 group-open:rotate-180">+</span>
              </summary>
              <div className="px-6 pb-4 text-gray-700">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    );
  }
  