class Favicon {
	constructor(notifications) {
		this.noti = notifications;
		
		this.iconRef = document.querySelector("head > link[rel=\"icon\"]");
		this.iconSize = 36;
		this.iconDefault = "/assets/favicon.svg";

		this.logo = new Image();
		this._applySize(this.logo);
		this.logo.src = this.iconDefault;

		this.canvas = document.createElement("canvas");
		this._applySize(this.canvas);

		this.ctx = this.canvas.getContext("2d");

		this.logo.addEventListener("load", () => this.update());
	}

	async update() {
		let totalNotiCount = 0;
		let highlightNotiCount = 0;

		this.noti.matrixClient.getRooms().forEach(room => {
			const {roomId} = room;

			if (this.noti.roomList.spaceShortcut.has(roomId)) return;
			if (!this.noti.hasNoti(roomId)) return;

			totalNotiCount += this.noti.getTotalNoti(roomId);
			highlightNotiCount += this.noti.getHighlightNoti(roomId);
		})

		if (totalNotiCount == 0) {
			this.iconRef.href = this.iconDefault;
			return;
		}

		// clear canvas
		this.ctx.clearRect(0, 0, this.iconSize, this.iconSize);
		this.ctx.drawImage(this.logo, 0, 0, this.iconSize, this.iconSize);

		this.ctx.fillStyle = '#f04747';
		this._drawCircle(this.iconSize / 3);

		if (highlightNotiCount < 1) {
			this._applyCanvas();
			return;
		}

		this.ctx.fillStyle = "#fff";
		if (highlightNotiCount < 10) {
			let position = this.iconSize * 2/3;
			this.ctx.font = `bold 20px sans-serif`;
			this.ctx.textAlign = "center";
			this.ctx.textBaseline = "middle";
			this.ctx.fillText(highlightNotiCount, position, position + 1)
		} else {
			this._drawCircle(this.iconSize / 3)
		}

		this._applyCanvas();
	}

	_applyCanvas() {
		this.canvas.toBlob((blob) => {
			// this should never happen but whatever
			if (!blob) {
				this.iconRef.href = this.iconDefault;
				return;
			}
			
			URL.revokeObjectURL(this.blob);

			this.blob = URL.createObjectURL(blob);
			this.iconRef.href = this.blob;
		});
	}

	_drawCircle(circleSize) {
		this.ctx.beginPath();
		let position = this.iconSize * 2 / 3;
		this.ctx.arc(position, position, circleSize, 0, 2*Math.PI);
		this.ctx.fill();
	}

	_applySize(element) {
		element.width = this.iconSize;
		element.height = this.iconSize;
	}
}

export default Favicon;