
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  title: string;
}

const AnimatedCounter = ({ 
  end, 
  duration = 2.5, 
  suffix = '', 
  prefix = '', 
  title 
}: AnimatedCounterProps) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  return (
    <div ref={ref} className="text-center py-4">
      <div className="font-nunito text-4xl md:text-5xl font-bold text-[#54221c] mb-2">
        {prefix}
        {hasAnimated ? (
          <CountUp end={end} duration={duration} separator="," />
        ) : (
          0
        )}
        {suffix}
      </div>
      <p className="text-black">{title}</p>
    </div>
  );
};

export default AnimatedCounter;