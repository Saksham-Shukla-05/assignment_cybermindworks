const jobs = [
  {
    id: 1,
    title: "FullStack Developer",
    company: "Amazon",
  },
  {
    id: 2,
    title: "AI Developer",
    company: "Microsoft",
  },
];

export const getJobs = async (req, res) => {
  try {
    res.status(200).json({
      message: jobs,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while fetching Jobs",
    });
  }
};

export const createJobs = async (req, res) => {
  try {
  } catch (error) {}
};
