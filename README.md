# FAQ-Chatbot

FAQ-Chatbot is a web application developed using Angular Javascript framework. The application allows you to interact with a chatbot through a chat interface by submitting a question and the chatbot answers with the most relevant information. The interaction is done using dropdown lists for topic of interest selection, Elasticsearch index field selection, the top-k retrieved results and radio buttons as trained deep learning-based model parameters on the following datasets: FAQIRv1.0 [1], Stack-exchange FAQ [2], and more recent Covid-19 FAQ [3].

![](demo/application.gif)

# Features
```
- Topic of Interest Selection (CovidFAQ, StackFAQ, FAQIR)
- Elasticsearch Match Field Selection (question, answer, question_answer)
- Elasticsearch Top-k Selection (10 - 100)
- Training Data Selection (faq, user_query)
- Negative Sampling Selection (simple, hard)
- Loss Type (softmax, triplet)
```

# Setup
```
I. BACK-END 
   
   1. clone BERT-FAQ project as standalone repo
      git clone https://github.com/ML-Recipes/BERT-FAQ

    2. create conda environment
       pip3 install conda
       conda create --name faq
       conda activate faq
   
    3. install required libraries
       conda install elasticsearch
       conda install elasticsearch-dsl
       conda install flask
       conda install pandas
       conda install numpy
       conda install pytorch
       conda install scikit-learn
       conda install xmltodict
       conda install sentence-transformers
       conda install -c conda-forge notebook
     
     4. keep BERT models within
        BERT-FAQ/output/CovidFAQ/models     # CovidFAQ
        BERT-FAQ/output/StackFAQ/models     # StackFAQ
        BERT-FAQ/output/FAQIR/models        # FAQIR
        
     5. run webserver.py
        python3 webserver.py

II. FRONT-END
 
    1. clone FAQ-Chatbot project as standalone repo
       git clone https://github.com/ML-Recipes/FAQ-Chatbot
       
    2. install required packages  
       cd front-end/chatbot
       npm install
       ng build
       
    3. run front-end project
       ng serve
    
    4. access locahost:4200 in browser

```

## Citations
```
@inproceedings{karan2015faqir,
      title={FAQIR -- a Frequently Asked Questions Retrieval Test Collection},
      author={Karan, Mladen and {\v{S}}najder, Jan},
      booktitle={Proceedings of the 10th edition of the Language Resources and Evaluation Conference, LREC 2016},
      year={2015},
      organization={ELRA}
  }
  
 @article{karan2018paraphrase,
      title={Paraphrase-focused learning to rank for domain-specific frequently asked questions retrieval},
      author={Karan, Mladen and {\v{S}}najder, Jan},
      journal={Expert Systems with Applications},
      volume={91},
      pages={418--433},
      year={2018},
      publisher={Elsevier}
}

@inproceedings{Collecting+COVID_NLP20202,
      title={Collecting Verified COVID-19 Question Answer Pairs},
      author={Poliak, Adam and Fleming, Max and Costello, Cash and Murray, Kenton W and Yarmohammadi, Mahsa and Pandya, Shivani and Irani, Darius and Agarwal,
      Milind and Sharma, Udit and Sun, Shuo and Ivanov, Nicola and Shang, Lingxi and Srinivasan, Kaushik and Lee, Seolhwa and Han, Xu and Agarwal, Smisha 
      and Sedoc, João},
      year={2020},
      booktitle={NLP COVID-19 Workshop @EMNLP},
      url={https://openreview.net/forum?id=GR03UfD2OZk}
}
```
