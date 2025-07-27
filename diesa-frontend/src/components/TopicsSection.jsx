import { Accordion, ProgressBar } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { topics } from '../data/topics';

function TopicsSection() {
  const [progress, setProgress] = useState({ total: 0, completed: 0 });

  useEffect(() => {
    let total = 0;
    let completed = 0;

    topics.forEach(section => {
      section.lectures.forEach(lec => {
        total += lec.questions.length;
        completed += lec.questions.filter(q => q.done).length;
      });
    });

    setProgress({ total, completed });
  }, []);

  return (
    <div className="mt-5">
      <h4 className="mb-3">Your Course Progress</h4>
      <ProgressBar
        now={(progress.completed / progress.total) * 100}
        label={`${progress.completed}/${progress.total}`}
        variant="success"
        className="mb-4"
      />

      <Accordion>
        {topics.map((step, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{step.step} ({step.total})</Accordion.Header>
            <Accordion.Body>
              {step.lectures.map((lec, i) => (
                <div key={i} className="mb-3">
                  <strong>{lec.title}</strong>
                  <ProgressBar
                    now={(lec.done / lec.total) * 100}
                    label={`${lec.done}/${lec.total}`}
                    variant="info"
                    className="my-2"
                  />
                  <ul className="list-unstyled">
                    {lec.questions.map((q, qIndex) => (
                      <li key={qIndex}>
                        <a href={q.url} target="_blank" rel="noopener noreferrer" style={{ color: q.done ? 'lime' : 'white' }}>
                          {q.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default TopicsSection;
