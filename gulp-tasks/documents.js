import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import debug from "gulp-debug";
gulp.task("pdf", () => {
	return gulp.src(paths.pdf.src)
		.pipe(gulp.dest(paths.pdf.dist))
		.pipe(debug({
				"title": "Pdf"
		}));
});