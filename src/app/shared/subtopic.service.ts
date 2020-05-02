import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubtopicService {

  topic_id: number;
  isText: boolean;
  constructor() { }

  setSubData(topic_id) {
    this.topic_id = topic_id;
  }
  getSubData() {
    return this.topic_id;
  }
  setTextType(isText) {
    this.isText = isText;
  }
  getTextType() {
    return this.isText;
  }
}
