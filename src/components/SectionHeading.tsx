import { useInView } from 'react-intersection-observer';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  isDark?: boolean;
}

const SectionHeading = ({ 
  title, 
  subtitle, 
  alignment = 'center',
  isDark = false
}: SectionHeadingProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto'
  };

  return (
    <div 
      ref={ref} 
      className={`mb-12 max-w-3xl ${alignmentClasses[alignment]}`}
    >
      <h2 
        className={`
          font-nunito text-3xl md:text-4xl font-bold mb-4
          transform transition-all duration-700 ease-out
          ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
          ${isDark ? 'text-white' : 'text-[#54221c]'}
        `}
      >
        {title}
      </h2>
      
      {subtitle && (
        <p 
          className={`
            text-lg leading-relaxed
            transform transition-all duration-700 delay-150 ease-out
            ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            ${isDark ? 'text-secondary-dark' : 'text-black'}
          `}
        >
          {subtitle}
        </p>
      )}
      
      <div 
        className={`
          h-1 w-20 mt-4 rounded-full
          transform transition-all duration-700 delay-300 ease-out
          ${inView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
          ${alignment === 'center' ? 'mx-auto' : ''}
          ${alignment === 'right' ? 'ml-auto' : ''}
          ${isDark ? 'bg-accent-light' : 'bg-accent-light'}
        `}
      />
    </div>
  );
};

export default SectionHeading;