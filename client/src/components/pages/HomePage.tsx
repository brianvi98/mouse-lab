import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { NavLink } from "react-router-dom";

import { Button } from "../ui/button";
import { Mouse, LineSquiggle, Spline, ChartColumnIncreasing } from "lucide-react";

const fadeInUpVariants: Variants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

const slideInFromRightVariants: Variants = {
  hidden: {
    x: 15,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const mouseVariants: Variants = {
  idle: {
    x: 0,
  },
  hover: {
    x: [-40, 40, -40, 40, 0],
    y: [-8, -8, 8, 8, 0],
    transition: {
      duration: 2,
    },
  },
};

function HomePage() {
  return (
    <div className="flex max-w-full flex-col items-center">
      {/* Hero */}
      <motion.section
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        <div className="mx-auto flex flex-col items-center gap-2 py-6">
          <motion.div variants={fadeInUpVariants}>
            <h2 className="text-center text-5xl">
              Know what your <span className="text-track-teal">mouse</span> <br /> is actually{" "}
              <span className="text-flick-orange">doing</span>
            </h2>
          </motion.div>

          <motion.div variants={fadeInUpVariants}>
            <p className="px-64 text-center text-gray-400">
              Run precision tests to measure velocity, acceleration, and movement consistency.
              <br />
              Compare gear. Make informed purchasing decisions.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUpVariants}
            className="rounded-lg border-4 border-slate-600 px-28 py-6"
            initial="idle"
            whileHover="hover"
          >
            <motion.div variants={mouseVariants}>
              <Mouse />
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUpVariants} whileTap={{ scale: 0.98 }}>
            <NavLink to="/testing">
              <Button className="mt-4 transform cursor-pointer rounded-xl border border-gray-700 bg-transparent px-12 py-5 text-white hover:-translate-y-0.5 hover:shadow-lg">
                Get Started
              </Button>
            </NavLink>
          </motion.div>
        </div>
      </motion.section>

      {/* Features */}
      <section className="mx-auto mt-2 w-full bg-[#141416] p-10 px-100">
        <div>
          <h2 className="text-sm font-semibold text-gray-400">FEATURES</h2>
          <p className="mt-4 text-2xl text-gray-300">Everything you need to evaluate your setup</p>
          <p className="mt-4 text-base font-light">
            Two purpose-built tests to capture aspects of your mouse across different movement patterns,
            <br />
            giving you a complete picture of your gear's performance.
          </p>
        </div>

        <motion.div
          className="mt-10 flex w-full gap-10"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={slideInFromRightVariants}
            className="flex h-88 w-80 flex-col gap-4 rounded-lg bg-mist-800 p-6"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <span className="flex w-12 items-center justify-center rounded-md border-2 p-2">
              <LineSquiggle />
            </span>
            <h3 className="text-lg">Tracking Test</h3>
            <p className="text-mist-300">
              Measure sustained and controlled movement, isolated along horizontal and vertical axes individually. Ideal
              for evaluating consistency and glide
            </p>
          </motion.div>
          <motion.div
            variants={slideInFromRightVariants}
            className="flex h-88 w-80 flex-col gap-4 rounded-lg bg-mist-800 p-6"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <span className="flex w-12 flex-col items-center justify-center gap-4 rounded-md border-2 p-2">
              <Spline />
            </span>
            <h3 className="text-lg">Flicking Test</h3>
            <p className="text-mist-300">
              Capture peak velocity and acceleration during explosive flicks. Evaluate how quickly your mouse starts
              moving from idle and the stopping power
            </p>
          </motion.div>
          <motion.div
            variants={slideInFromRightVariants}
            className="flex h-88 w-80 flex-col gap-4 rounded-lg bg-mist-800 p-6"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <span className="flex w-12 flex-col items-center justify-center gap-4 rounded-md border-2 p-2">
              <ChartColumnIncreasing />
            </span>
            <h3 className="text-lg">Live Plots</h3>
            <p className="text-mist-300">
              Visualize raw and smoothed motion data across several metrics. Expand any chart for a deeper dive into how
              your setup behaves during movement
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Exposition */}
      <section className="mx-auto mt-2 w-full p-10 px-100">
        <h2 className="text-sm font-semibold text-gray-400">HOW IT WORKS</h2>
        <h3 className="mt-2 text-2xl">Three steps to finally start understanding your gear</h3>

        <div className="mt-10 grid grid-cols-[1fr_20fr] grid-rows-3 gap-y-4">
          <span className="flex w-1/4 items-center justify-center">1</span>
          <div className="w-3/4 content-center">
            <h4 className="text-lg font-medium text-olive-400">Enter your hardware</h4>
            <p>Log your mouse, mousepad, mouse skates, DPI, and polling rate to identify the current test setup</p>
          </div>
          <span className="flex w-1/4 items-center justify-center">2</span>
          <div className="w-3/4 content-center">
            <h4 className="text-lg font-medium text-olive-400">Complete the tests</h4>
            <p>
              Complete both of the tracking and flicking tests. Each test captures raw pointer data through your browser
              in real time, as you perform the movements involved
            </p>
          </div>
          <span className="flex w-1/4 items-center justify-center">3</span>
          <div className="w-3/4 content-center">
            <h4 className="text-lg font-medium text-olive-400">Analyze your results</h4>
            <p>
              Review velocity and acceleration plots, compare across sessions, and see how different combinations of
              your gear stack up against yourself and others
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="mx-auto mt-24 flex w-full flex-col items-center gap-4 bg-[#141416] p-10 px-100 pb-64"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeInUpVariants}>
          <h2 className="text-5xl text-amber-100">Ready to begin testing?</h2>
        </motion.div>
        <motion.div variants={fadeInUpVariants}>
          <p className="text-2xl text-amber-100">No account needed</p>
        </motion.div>
        <motion.div variants={fadeInUpVariants}>
          <NavLink to="/testing">
            <Button className="mt-4 transform cursor-pointer rounded-xl border border-gray-700 bg-transparent px-12 py-5 text-white hover:-translate-y-0.5 hover:shadow-lg">
              Go to Testing
            </Button>
          </NavLink>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default HomePage;
