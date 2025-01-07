import { Component, OnInit } from '@angular/core';
import {
  ButtonColorStyles,
  ButtonRadiusStyles,
} from '../button/button.component';

@Component({
  selector: 'uab-video-recoder',
  standalone: false,
  templateUrl: './video-recoder.component.html',
  styleUrl: './video-recoder.component.scss',
})
export class VideoRecoderComponent implements OnInit {
  protected buttonColor = ButtonColorStyles;
  protected buttonRadius = ButtonRadiusStyles;

  private mediaRecorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private timer: any = null;
  private startTime: number = 0;
  private totalTime: number = 5000; // Duration of recording (5 seconds)
  public isRecording: boolean = true;
  public videoUrl: string | null = null;

  // For circular progress bar
  public progressRingBackground = 'rgba(255, 255, 255, 0.1)';
  public progressBarOffset: number = 80;

  constructor() {}
  ngOnInit(): void {
    this.initializeCamera();
  }

  initializeCamera() {
    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then((stream) => {
    //     this.stream = stream;
    //     this.videoElement.nativeElement.srcObject = stream;
    //   })
    //   .catch((error) => {
    //     console.error('Error accessing camera or microphone:', error);
    //   });
  }

  async startRecording() {
    if (this.isRecording) return;

    try {
      // Get access to the user's webcam and microphone
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // Initialize the MediaRecorder to record the stream
      this.mediaRecorder = new MediaRecorder(stream);

      // When data is available, push it to chunks
      this.mediaRecorder.ondataavailable = (event) => {
        this.chunks.push(event.data);
      };

      // When the recording stops, create a Blob and display the video
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: 'video/webm' });
        this.videoUrl = URL.createObjectURL(blob); // Create a URL for the video file
        this.chunks = []; // Clear chunks for next recording
      };

      this.mediaRecorder.start(); // Start recording
      this.isRecording = true; // Indicate that recording is in progress
      this.startTime = Date.now(); // Record the start time

      // Start the circular progress bar animation
      this.updateProgress();

      // Stop recording after 5 seconds
      this.timer = setTimeout(() => this.stopRecording(), this.totalTime);
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop(); // Stop the recording
      this.isRecording = false; // Update the recording status
      clearTimeout(this.timer); // Clear the timeout to stop recording
    }
  }

  private updateProgress() {
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - this.startTime;
      const progress = (elapsedTime / this.totalTime) * 100; // Calculate progress percentage
      const progressOffset = 1256 - (progress / 100) * 1256; // Calculate stroke-dashoffset

      this.progressBarOffset = progressOffset;

      if (elapsedTime >= this.totalTime) {
        clearInterval(interval); // Stop updating progress when 5 seconds are up
      }
    }, 50); // Update the progress bar every 50ms
  }
}
