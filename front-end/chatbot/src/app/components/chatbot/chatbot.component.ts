import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChatbotService } from 'src/app/services/chatbot.service';
import { Subject } from 'rxjs';
import { CustomStepDefinition, LabelType, Options } from '@angular-slider/ngx-slider';

export class Chat {
  message: any;
  isMe: boolean = false;
  type: string = "";

  constructor(message: string, isMe: boolean, type: string) { }
}
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  dataset: string = "";
  loss_type: string = "";
  neg_type: string = "";
  query_type: string = "";
  field: string = "";
  top_k: number = 0;
  
  conversation = new Subject<Chat[]>();
  chats: Chat[] = [];
  message: string = "";

  neg_types = ['Simple', 'Hard'];
  loss_types = ['Softmax', 'Triplet'];
  query_types = ['FAQ', 'USER_QUERY'];
  fields = ['question', 'answer', 'question_answer']
  datasets: any[] = ['CovidFAQ', 'FAQIR', 'StackFAQ'];
  top_k_options: any[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  value: any;
  selectionDataset: any;
  steps = [
    {
      label: 'Label 1', 
      value: 0
    }, 
    {
      label:'Label 2', 
      value:1
    }, 
    {
      label:'Label 3', 
      value:2
    }
  ];

  options: Options = {
    showTicks: true,
    showTicksValues: true,
    stepsArray: this.steps.map((s): CustomStepDefinition => {
      return { value: s.value };
    }),
    translate: (value: number, label: LabelType): string => {
      return this.steps[value].label;
    }
  };

  constructor(private chatbotService: ChatbotService, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    
    // Display default values dropdown, radio buttons
    this.top_k = 10;
    this.loss_type = "Triplet";
    this.neg_type = "Hard";
    this.query_type = "USER_QUERY";
    this.dataset = "CovidFAQ";
    this.field = "question_answer"

    // Display default welcome message in chat section
    let userMessage_default = { message: '', isMe: false, type: '' }
    let chatbotMessage_default = {
      message:
        [{
          "_type": "welcome",
          "answer": "Welcome! I’m your assistant. You can ask me any question. First select a dataset and submit the given options for model prediction at the top of the chatbot section"
        }],

      isMe: false,
      type: 'bot'
    }

    setTimeout(() => {
      this.chats = [userMessage_default, chatbotMessage_default]
    }, 1500);

    this.conversation.subscribe((val) => {
      this.chats = this.chats.concat(val);
    });
  }

  sendMessage() {
    this.getBotAnswer(this.message);
    this.message = '';
  }

  getBotAnswer(msg: string) {
    let userMessage = { message: msg, isMe: true, type: 'user' }
    this.conversation.next([userMessage]);

    let params = {
      "top_k": this.top_k,
      "field": this.field,
      "query_string": this.message,
      "loss_type": this.loss_type,
      "neg_type": this.neg_type,
      "query_type": this.query_type,
      "index_name": this.dataset.toLowerCase() + "_" + this.selectionDataset[this.value].label,
      "dataset": this.dataset
    }

    let botMessage: any;
    
    this.chatbotService.send_message(params).subscribe(data => {
      botMessage = { message: data, isMe: false, type: 'bot' };
      this.conversation.next([botMessage]);
    });

  }

  onDatasetSelection(event: any){
    const dataset = event.target.value;

    this.chatbotService.get_index_list(dataset.toLowerCase()).subscribe(data => {
      this.selectionDataset = data
    
      this.options = {
        showTicks: true,
        showTicksValues: true,
        stepsArray: this.selectionDataset.map((s: any): CustomStepDefinition => {
          return { value: s.value, legend: s.legend + " <small>DOCS</small>" };
        }),
        translate: (value: number, label: LabelType): string => {
          return this.selectionDataset[value].label;
        }
      }
    })
    
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();    
  }
}
