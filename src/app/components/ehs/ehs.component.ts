import { Component } from '@angular/core';

interface Shot {
  src: string;
  alt: string;
  caption: string;
}

interface PracticeGroup {
  title: string;
  note: string;
  items: string[];
}

@Component({
  selector: 'app-ehs',
  imports: [],
  templateUrl: './ehs.component.html',
  styleUrl: './ehs.component.scss'
})
export class EhsComponent {

  readonly shots: Shot[] = [
    {
      src: 'assets/companyimg/safety-traning.jpg',
      alt: 'Crew running a pre-start briefing at a drill pad',
      caption: 'HSE training'
    },
    {
      src: 'assets/companyimg/311.JPG',
      alt: 'Supervisor carrying out a site inspection',
      caption: 'Site inspection and audit'
    },
    {
      src: 'assets/companyimg/30.JPG',
      alt: 'Consultation meeting with local landowners',
      caption: 'Consultation at village level'
    }
  ];

  readonly practices: PracticeGroup[] = [
    {
      title: 'Standards and systems',
      note: 'What we work to',
      items: [
        'Complying with all applicable EHS laws and regulations in PNG, and actively following organisations such as WHS, NEBOSH and IOGP',
        'Implementing and maintaining effective EHS management systems',
        'Integrating our safety management plans and procedures with those of the client on every project'
      ]
    },
    {
      title: 'People and training',
      note: 'Who carries it',
      items: [
        'Ensuring all employees are trained on EHS procedures and practices',
        'Verifying competency training programs are in place for our staff',
        "Clearly communicating that safety is everyone's responsibility"
      ]
    },
    {
      title: 'Sites and operations',
      note: 'How it holds up in the field',
      items: [
        'Conducting regular EHS inspections and audits',
        'Performing risk assessments in all operations and at all sites',
        'Using safe and environmentally friendly materials and practices',
        'Investigating all accidents and incidents and implementing corrective actions'
      ]
    }
  ];

}